// Browser-only stand-in for expo-font's useFonts, used by Storybook via a Vite alias.
// expo-font itself pulls in expo-asset and native module glue that Vite can't bundle.
import { useEffect, useState } from 'react';

type FontSource = string | { uri?: string; default?: string };

const toUrl = (src: FontSource) => (typeof src === 'string' ? src : (src.uri ?? src.default ?? ''));

export function useFonts(map: Record<string, FontSource>): [boolean, Error | null] {
  const [state, setState] = useState<[boolean, Error | null]>([false, null]);
  useEffect(() => {
    let alive = true;
    Promise.all(
      Object.entries(map).map(async ([family, src]) => {
        const face = new FontFace(family, `url(${toUrl(src)})`);
        await face.load();
        document.fonts.add(face);
      }),
    ).then(
      () => alive && setState([true, null]),
      (error: Error) => alive && setState([false, error]),
    );
    return () => {
      alive = false;
    };
  }, [map]);
  return state;
}
