import type { StorybookConfig } from '@storybook/react-native-web-vite';
import { fileURLToPath } from 'node:url';

const shim = (file: string) => fileURLToPath(new URL(`./shims/${file}`, import.meta.url));

const config: StorybookConfig = {
  stories: ['../../../packages/ui/src/**/*.stories.@(ts|tsx)'],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {},
  },
  viteFinal: async (config) => {
    const aliases = [
      { find: /^expo-font$/, replacement: shim('expo-font.ts') },
      { find: /^@react-native\/assets-registry\/registry$/, replacement: shim('assets-registry.ts') },
    ];
    const existing = config.resolve?.alias ?? [];
    config.resolve = {
      ...config.resolve,
      alias: Array.isArray(existing)
        ? [...aliases, ...existing]
        : [...aliases, ...Object.entries(existing).map(([find, replacement]) => ({ find, replacement }))],
    };
    // react-native-svg imports TurboModuleRegistry, which react-native-web doesn't export. It's never
    // called in the browser, so let Rolldown stub it instead of failing the build.
    config.optimizeDeps = {
      ...config.optimizeDeps,
      exclude: [...(config.optimizeDeps?.exclude ?? []), 'expo-font'],
      rolldownOptions: { ...config.optimizeDeps?.rolldownOptions, shimMissingExports: true },
    };
    config.build = {
      ...config.build,
      rolldownOptions: { ...config.build?.rolldownOptions, shimMissingExports: true },
    };
    return config;
  },
};

export default config;
