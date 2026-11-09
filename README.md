# Wanderly design system

React Native (Expo) design system for the Wanderly travel app, generated from the
[Figma file](https://www.figma.com/design/f2tSOfcWCn8dS1ePHl1uHh). Three brands share one
token shape: **aurora** (default), **ember** and **slate**.

## Packages

| Path | What it is |
|---|---|
| `packages/tokens` | Design tokens. Figma export → W3C token JSON → typed TS themes (Style Dictionary). |
| `packages/ui` | React Native runtime (`ThemeProvider`, `useTheme`, `useBrandFonts`), components and templates. |
| `apps/example` | The Wanderly app: Expo Router with 5 tabs (Explore, Trips, Saved, Inbox, Profile) and a pushed Personal details page. Switch brands from Profile → Brand theme. |
| `apps/storybook` | Storybook (react-native-web + Vite) with a Brand switcher in the toolbar. Stories live next to components in `packages/ui`. |

## Components

- **Components** (`packages/ui/src/components`): `Icon`, `IconButton`, `Tag`, `Checkbox`, `Button`, `Input`, `Stepper`,
  `MenuItem`, `Alert`, `Card`, `Logo`, `TopBar`, `PageHeader`, `TabBar` + `TabBarItem`.
- **Templates** (`packages/ui/src/templates`): `TabTemplate` (root tab screen: logo top bar, large title,
  content, tab bar) and `PageTemplate` (pushed screen: header with back, content, pinned bottom bar).
  `children` is the content slot, like the Figma Content slot.

Every color, size, spacing, radius and font comes from `useTheme()`; components hold no literal design values.
Templates use the device safe-area insets for the status bar and home indicator.

In the app, the tab bar is rendered by `expo-router/ui` with `<TabList asChild><TabBar>` and
`<TabTrigger asChild><TabBarItem>`; see `apps/example/src/app/(tabs)/_layout.tsx`.

## Commands

```bash
npm install          # once, from the repo root
npm run tokens       # rebuild themes after a new Figma export
npm run typecheck
npm run example      # Expo dev server; open in Expo Go
npm run example:web  # same app in the browser (http://localhost:8082)
npm run storybook    # component catalogue (http://localhost:6006)
```

## Updating tokens from Figma

### With the Wanderly Token Sync plugin (recommended)

`figma-plugin/` is a small Figma plugin that exports the file's variables and text styles and opens a
pull request that updates `packages/tokens/figma/figma-export.json`. The **Build tokens** GitHub Action
(`.github/workflows/tokens.yml`) then runs `npm run tokens` and `npm run typecheck` on that pull request and
commits the generated files to it. Merge when the check is green.

One-time setup:

1. In the Figma desktop app: **Plugins → Development → Import plugin from manifest…** and pick
   `figma-plugin/manifest.json`.
2. On GitHub, create a fine-grained token (Settings → Developer settings → Fine-grained tokens) with access to
   this repository only and the permissions **Contents: Read and write** and **Pull requests: Read and write**.
   Paste it into the plugin once; it's stored only on your computer (Figma client storage).

Each time: run the plugin, click **Check for changes**, review the list, click **Open pull request**.

### By hand

1. Replace `packages/tokens/figma/figma-export.json` with a fresh export of the Figma variables
   and text styles (same shape as the current file).
2. Run `npm run tokens`. This writes `packages/tokens/tokens/*.json` (W3C format) and
   `packages/tokens/src/generated/*.ts`.
3. Run `npm run typecheck`. It fails if one brand is missing a token the others have.
4. If the build reports a new font, add it to `packages/ui/src/fonts.ts`.

Never edit `tokens/` or `src/generated/` by hand.

## Using the theme

```tsx
import { ThemeProvider, useBrandFonts, useTheme } from '@wanderly/ui';

export default function App() {
  const fontsLoaded = useBrandFonts();
  if (!fontsLoaded) return null;
  return <ThemeProvider brand="aurora"><Home /></ThemeProvider>;
}

function Home() {
  const t = useTheme();
  return (
    <View style={{ padding: t.dimension.margin.screen, backgroundColor: t.color.surface.neutral.base }}>
      <Text style={[t.typography.heading.lg, { color: t.color.text.neutral.body }]}>Explore</Text>
    </View>
  );
}
```

## Figma Code Connect

`codeconnect/` holds Code Connect [template files](https://developers.figma.com/docs/code-connect/template-files/)
(`*.figma.ts`) that turn a selected Figma instance into a ready-to-paste snippet in Dev Mode, e.g. a secondary
large button becomes `<Button label="Save" variant="secondary" size="large" />`. All icon components share
one batch template (`icons.figma.batch.ts` + `.json`). Config lives in `figma.config.json`.

```bash
npm run codeconnect:check                                   # validate templates locally
FIGMA_ACCESS_TOKEN=… npx figma connect publish --dry-run     # see what would be published
FIGMA_ACCESS_TOKEN=… npm run codeconnect:publish            # publish to Figma
```

The token needs **Code Connect: Write** and **File content: Read** scopes (Figma → Settings → Security →
Personal access tokens). If a component conflicts with an existing Code Connect UI link, add `--force` to replace it.

Token paths mirror the Figma names: `surface/color/brand/solid` → `t.color.surface.brand.solid`,
`border/dimension/radius/md` → `t.radius.md`, `semantic/margin/screen` → `t.dimension.margin.screen`.
