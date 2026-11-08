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

- **Components** (`packages/ui/src/components`): `Icon`, `IconButton`, `Tag`, `Checkbox`, `Button`, `Input`,
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

Token paths mirror the Figma names: `surface/color/brand/solid` → `t.color.surface.brand.solid`,
`border/dimension/radius/md` → `t.radius.md`, `semantic/margin/screen` → `t.dimension.margin.screen`.
