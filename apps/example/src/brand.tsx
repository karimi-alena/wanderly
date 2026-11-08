import { brandNames, type BrandName } from '@wanderly/ui';
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type BrandState = { brand: BrandName; nextBrand: () => void };

const BrandContext = createContext<BrandState | null>(null);

export function BrandStateProvider({ children }: { children: ReactNode }) {
  const [brand, setBrand] = useState<BrandName>('aurora');
  const value = useMemo<BrandState>(
    () => ({ brand, nextBrand: () => setBrand((b) => brandNames[(brandNames.indexOf(b) + 1) % brandNames.length]) }),
    [brand],
  );
  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>;
}

export function useBrandState(): BrandState {
  const state = useContext(BrandContext);
  if (!state) throw new Error('useBrandState() must be used inside <BrandStateProvider>.');
  return state;
}
