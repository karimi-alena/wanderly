// Wanderly Token Sync — Figma side.
// Reads the file's local variables and text styles in the same shape as
// packages/tokens/figma/figma-export.json, then hands them to the UI, which talks to GitHub.

function hex(c) {
  var parts = [c.r, c.g, c.b].map(function (x) {
    return Math.round(x * 255).toString(16).padStart(2, '0');
  });
  var out = '#' + parts.join('').toUpperCase();
  if (c.a !== undefined && c.a < 1) out += Math.round(c.a * 255).toString(16).padStart(2, '0').toUpperCase();
  return out;
}

async function exportTokens(fileKey) {
  var cols = await figma.variables.getLocalVariableCollectionsAsync();
  var vars = await figma.variables.getLocalVariablesAsync();
  var byId = {};
  vars.forEach(function (v) { byId[v.id] = v; });
  var colById = {};
  cols.forEach(function (c) { colById[c.id] = c; });

  function refName(id) {
    var t = byId[id];
    return colById[t.variableCollectionId].name + '/' + t.name;
  }
  function val(v, type) {
    if (v && typeof v === 'object' && v.type === 'VARIABLE_ALIAS') return { alias: refName(v.id) };
    return type === 'COLOR' ? hex(v) : v;
  }

  var textStyles = await figma.getLocalTextStylesAsync();
  return {
    exportedAt: new Date().toISOString(),
    fileKey: fileKey,
    collections: cols.map(function (c) {
      return {
        name: c.name,
        modes: c.modes.map(function (m) { return m.name; }),
        variables: c.variableIds.map(function (id) { return byId[id]; }).filter(Boolean).map(function (v) {
          var values = {};
          c.modes.forEach(function (m) { values[m.name] = val(v.valuesByMode[m.modeId], v.resolvedType); });
          return {
            name: v.name,
            type: v.resolvedType,
            scopes: v.scopes,
            web: (v.codeSyntax && v.codeSyntax.WEB) || null,
            values: values,
          };
        }),
      };
    }),
    textStyles: textStyles.map(function (s) {
      var b = s.boundVariables || {};
      function ref(f) { return b[f] ? refName(b[f].id) : null; }
      return {
        name: s.name,
        fontFamily: ref('fontFamily'),
        fontStyle: ref('fontStyle'),
        fontSize: ref('fontSize') || s.fontSize,
        lineHeight: s.lineHeight,
        letterSpacing: s.letterSpacing,
      };
    }),
  };
}

// Compare two exports and list what a designer would care about. exportedAt is ignored.
function diffExports(before, after) {
  function index(exp) {
    var map = {};
    (exp && exp.collections || []).forEach(function (c) {
      c.variables.forEach(function (v) { map[c.name + '/' + v.name] = { kind: 'variable', item: v }; });
    });
    (exp && exp.textStyles || []).forEach(function (s) { map['text style ' + s.name] = { kind: 'textStyle', item: s }; });
    return map;
  }
  // Figma may list a variable's scopes in a different order; order doesn't matter.
  function norm(item) {
    if (!item || !item.scopes) return JSON.stringify(item);
    var copy = JSON.parse(JSON.stringify(item));
    copy.scopes = copy.scopes.slice().sort();
    return JSON.stringify(copy);
  }
  function show(x) {
    if (x && typeof x === 'object' && x.alias) return '{' + x.alias.replace(/^semantic-brand\/|^dimension\//, '') + '}';
    if (x && typeof x === 'object') return JSON.stringify(x);
    return String(x);
  }
  var a = index(before), b = index(after);
  var added = [], removed = [], changed = [];
  Object.keys(b).forEach(function (k) { if (!a[k]) added.push(k); });
  Object.keys(a).forEach(function (k) { if (!b[k]) removed.push(k); });
  Object.keys(b).forEach(function (k) {
    if (!a[k] || norm(a[k].item) === norm(b[k].item)) return;
    var details = [];
    var oldItem = a[k].item, newItem = b[k].item;
    if (b[k].kind === 'variable') {
      Object.keys(newItem.values).forEach(function (mode) {
        var o = oldItem.values[mode], n = newItem.values[mode];
        if (JSON.stringify(o) !== JSON.stringify(n)) details.push(mode + ': ' + show(o) + ' → ' + show(n));
      });
      if (JSON.stringify((oldItem.scopes || []).slice().sort()) !== JSON.stringify((newItem.scopes || []).slice().sort())) {
        details.push('scopes: ' + (oldItem.scopes || []).join(', ') + ' → ' + (newItem.scopes || []).join(', '));
      }
      if (oldItem.web !== newItem.web) details.push('code syntax: ' + show(oldItem.web) + ' → ' + show(newItem.web));
      if (oldItem.type !== newItem.type) details.push('type: ' + oldItem.type + ' → ' + newItem.type);
    } else {
      Object.keys(newItem).forEach(function (f) {
        if (JSON.stringify(oldItem[f]) !== JSON.stringify(newItem[f])) details.push(f + ': ' + show(oldItem[f]) + ' → ' + show(newItem[f]));
      });
    }
    changed.push({ name: k, details: details });
  });
  var modesChanged = [];
  (after && after.collections || []).forEach(function (c) {
    var old = (before && before.collections || []).filter(function (x) { return x.name === c.name; })[0];
    if (old && JSON.stringify(old.modes) !== JSON.stringify(c.modes)) {
      modesChanged.push(c.name + ': ' + old.modes.join(', ') + ' → ' + c.modes.join(', '));
    }
  });
  return { added: added, removed: removed, changed: changed, modesChanged: modesChanged };
}

if (typeof module !== 'undefined') module.exports = { diffExports: diffExports, hex: hex };

if (typeof figma !== 'undefined') {
  figma.showUI(__html__, { width: 400, height: 560, themeColors: true });

  figma.ui.onmessage = async function (msg) {
    try {
      if (msg.type === 'load-settings') {
        figma.ui.postMessage({
          type: 'settings',
          repo: (await figma.clientStorage.getAsync('repo')) || 'karimi-alena/wanderly',
          token: (await figma.clientStorage.getAsync('githubToken')) || '',
        });
      } else if (msg.type === 'save-settings') {
        await figma.clientStorage.setAsync('repo', msg.repo);
        if (msg.token !== undefined) await figma.clientStorage.setAsync('githubToken', msg.token);
      } else if (msg.type === 'forget-token') {
        await figma.clientStorage.deleteAsync('githubToken');
      } else if (msg.type === 'export') {
        // msg.current is the export currently in the repo (or null); keep its fileKey.
        var current = msg.current;
        var next = await exportTokens((current && current.fileKey) || figma.fileKey || null);
        figma.ui.postMessage({ type: 'exported', data: next, diff: diffExports(current, next) });
      }
    } catch (e) {
      figma.ui.postMessage({ type: 'error', message: String(e && e.message || e) });
    }
  };
}
