import { aurora } from './generated/aurora';
import { dimension } from './generated/dimension';
import { ember } from './generated/ember';
import { slate } from './generated/slate';

export type BrandTokens = typeof aurora;
export type Dimension = typeof dimension;
export type TextStyle = BrandTokens['typography']['body']['md'];

// `satisfies` makes the build fail if a brand drifts from the shared token shape.
export const brands = { aurora, ember, slate } satisfies Record<string, BrandTokens>;
export type BrandName = keyof typeof brands;
export const brandNames = Object.keys(brands) as BrandName[];

export { dimension };
