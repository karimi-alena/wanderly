// Per-weight imports, so bundles only include the font files the brands actually use.
import { Fraunces_600SemiBold } from '@expo-google-fonts/fraunces/600SemiBold';
import { Fraunces_700Bold } from '@expo-google-fonts/fraunces/700Bold';
import { IBMPlexMono_400Regular } from '@expo-google-fonts/ibm-plex-mono/400Regular';
import { IBMPlexSans_400Regular } from '@expo-google-fonts/ibm-plex-sans/400Regular';
import { IBMPlexSans_500Medium } from '@expo-google-fonts/ibm-plex-sans/500Medium';
import { IBMPlexSans_600SemiBold } from '@expo-google-fonts/ibm-plex-sans/600SemiBold';
import { IBMPlexSans_700Bold } from '@expo-google-fonts/ibm-plex-sans/700Bold';
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { Inter_700Bold } from '@expo-google-fonts/inter/700Bold';
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono/400Regular';
import { NunitoSans_400Regular } from '@expo-google-fonts/nunito-sans/400Regular';
import { NunitoSans_500Medium } from '@expo-google-fonts/nunito-sans/500Medium';
import { NunitoSans_600SemiBold } from '@expo-google-fonts/nunito-sans/600SemiBold';
import { brands } from '@wanderly/tokens';
import { useFonts } from 'expo-font';

export const fontSources = {
  Fraunces_600SemiBold,
  Fraunces_700Bold,
  IBMPlexMono_400Regular,
  IBMPlexSans_400Regular,
  IBMPlexSans_500Medium,
  IBMPlexSans_600SemiBold,
  IBMPlexSans_700Bold,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  JetBrainsMono_400Regular,
  NunitoSans_400Regular,
  NunitoSans_500Medium,
  NunitoSans_600SemiBold,
};

// Fails loudly when a Figma token change needs a font that isn't wired up above.
const missing = Object.values(brands)
  .flatMap((b) => b.fontFiles)
  .filter((name) => !(name in fontSources));
if (missing.length) {
  throw new Error(`Add these fonts to packages/ui/src/fonts.ts: ${[...new Set(missing)].join(', ')}`);
}

/** Loads every font used by any brand. Returns true once they are ready. */
export function useBrandFonts(): boolean {
  const [loaded] = useFonts(fontSources);
  return loaded;
}
