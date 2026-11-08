import { brands, dimension, type BrandName, type BrandTokens, type Dimension } from '@wanderly/tokens';
import { createContext, useContext, useMemo, type ReactNode } from 'react';

export type Theme = BrandTokens & { brand: BrandName; dimension: Dimension };

const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({ brand = 'aurora', children }: { brand?: BrandName; children: ReactNode }) {
  const theme = useMemo<Theme>(() => ({ ...brands[brand], brand, dimension }), [brand]);
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error('useTheme() must be used inside <ThemeProvider>.');
  return theme;
}
