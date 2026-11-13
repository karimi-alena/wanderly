// Converts the raw Figma variables export (figma/figma-export.json) into
// W3C design-token (DTCG) JSON files under tokens/, which Style Dictionary builds.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const exp = JSON.parse(readFileSync(join(root, 'figma/figma-export.json'), 'utf8'));

const camel = (s) => s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

const BRAND = 'semantic-brand';
const fallbacks = new Set();

// Figma variable name -> token path in code. Returns null for Figma-only variables.
function pathFor(collection, name) {
  const p = name.split('/');
  if (collection === 'dimension') return ['dimension', ...p.slice(1).map(camel)];
  // Any other collection (e.g. elevation) keeps its Figma path under the collection name:
  // elevation/shadow/sm/blur -> elevation.shadow.sm.blur
  if (collection !== BRAND) return [camel(collection), ...p.map(camel)];
  if (p[0] === 'palette') return ['color', 'palette', ...p.slice(2)];
  if (p[1] === 'color') return ['color', p[0], ...p.slice(2).map(camel)];
  if (p[0] === 'border' && p[2] === 'radius') return ['radius', p[3]];
  if (p[0] === 'border' && p[2] === 'weight') return ['borderWidth', p[3]];
  // Other border sizes, e.g. border/dimension/focus-ring-offset -> border.focusRingOffset
  if (p[0] === 'border' && p[1] === 'dimension') return ['border', ...p.slice(2).map(camel)];
  if (p[0] === 'text' && p[2] === 'font') return ['font', 'family', p[3]];
  if (p[0] === 'text' && p[2] === 'weight') return ['font', 'weight', p[3]];
  if (p[0] === 'text' && p[2] === 'font-style') return null; // Figma style names; code derives fonts from weight
  // No specific rule: use the Figma path as-is (camelCased) so a new variable never breaks the build.
  fallbacks.add(`${collection}/${name} -> ${p.map(camel).join('.')}`);
  return p.map(camel);
}

const refFor = (qualified) => {
  const [collection, ...rest] = qualified.split('/');
  const path = pathFor(collection, rest.join('/'));
  if (!path) throw new Error(`Reference to Figma-only variable ${qualified}`);
  return `{${path.join('.')}}`;
};

const typeFor = (v) => (v.type === 'COLOR' ? 'color' : v.type === 'STRING' ? 'fontFamily' : 'number');

function set(tree, path, token) {
  let node = tree;
  for (const key of path.slice(0, -1)) node = node[key] ??= {};
  node[path.at(-1)] = token;
}

function tokenFor(v, value) {
  return {
    $type: typeFor(v),
    $value: value && typeof value === 'object' && value.alias ? refFor(value.alias) : value,
    $extensions: { figma: { name: v.name, ...(v.web ? { web: v.web } : {}) } },
  };
}

const write = (file, data) => {
  const out = join(root, 'tokens', file);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, JSON.stringify(data, null, 2) + '\n');
  return file;
};
const written = [];

// dimension: one mode, shared by every brand
const dim = exp.collections.find((c) => c.name === 'dimension');
const dimTree = {};
for (const v of dim.variables) set(dimTree, pathFor('dimension', v.name), tokenFor(v, v.values[dim.modes[0]]));
written.push(write('dimension.json', dimTree));

// semantic-brand: one file per mode (= brand)
const brand = exp.collections.find((c) => c.name === BRAND);
for (const mode of brand.modes) {
  const tree = {};
  for (const v of brand.variables) {
    const path = pathFor(BRAND, v.name);
    if (path) set(tree, path, tokenFor(v, v.values[mode]));
  }
  written.push(write(`brands/${mode.toLowerCase()}.json`, tree));
}

// Any other collection is shared by every brand and lands in tokens/shared/<name>.json.
// It must have a single mode; a collection with brand modes belongs in semantic-brand.
rmSync(join(root, 'tokens/shared'), { recursive: true, force: true });
for (const c of exp.collections) {
  if (c.name === 'dimension' || c.name === BRAND) continue;
  if (c.modes.length !== 1) {
    throw new Error(
      `Collection "${c.name}" has ${c.modes.length} modes (${c.modes.join(', ')}). ` +
        `Shared collections need exactly one mode; put brand-specific variables in ${BRAND}.`,
    );
  }
  const tree = {};
  for (const v of c.variables) set(tree, pathFor(c.name, v.name), tokenFor(v, v.values[c.modes[0]]));
  written.push(write(`shared/${c.name}.json`, tree));
}

// typography: text styles reference brand fonts + shared sizes
const typo = {};
for (const s of exp.textStyles) {
  const weight = s.fontStyle.split('/').pop();
  set(typo, ['typography', ...s.name.split('/').map(camel)], {
    $type: 'typography',
    $value: {
      fontFamily: refFor(s.fontFamily),
      fontWeight: `{font.weight.${weight}}`,
      fontSize: refFor(s.fontSize),
      lineHeight: Math.round(s.lineHeight.value) / 100,
      letterSpacing: Math.round(s.letterSpacing.value) / 100,
    },
    $extensions: { figma: { name: s.name } },
  });
}
written.push(write('typography.json', typo));

console.log(`Converted Figma export (${exp.exportedAt}) → ${written.map((f) => 'tokens/' + f).join(', ')}`);
if (fallbacks.size) {
  console.log(`\nNo naming rule for ${fallbacks.size} variable(s); used the Figma path instead:`);
  for (const f of fallbacks) console.log(`  ${f}`);
}
