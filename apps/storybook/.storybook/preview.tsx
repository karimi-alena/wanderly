import type { Preview } from '@storybook/react-native-web-vite';
import { brandNames, ThemeProvider, useBrandFonts, useTheme, type BrandName } from '@wanderly/ui';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

/** Stories render on a padded surface, or inside a phone-sized frame when `parameters.device` is true. */
function Canvas({ device, children }: { device: boolean; children: ReactNode }) {
  const t = useTheme();
  if (device) {
    const { container, margin } = t.dimension;
    return (
      <View style={{ flex: 1, alignItems: 'center', padding: margin.screen, backgroundColor: t.color.surface.neutral.dim }}>
        <View
          style={{
            width: container.width.screen,
            height: container.height.screen,
            overflow: 'hidden',
            borderRadius: t.radius.xl,
            backgroundColor: t.color.surface.neutral.base,
          }}
        >
          {children}
        </View>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, padding: t.dimension.margin.screen, backgroundColor: t.color.surface.neutral.base }}>
      {children}
    </View>
  );
}

function Fonts({ children }: { children: ReactNode }) {
  return useBrandFonts() ? <>{children}</> : null;
}

const preview: Preview = {
  globalTypes: {
    brand: {
      description: 'Brand theme',
      toolbar: {
        title: 'Brand',
        icon: 'paintbrush',
        items: brandNames.map((name) => ({ value: name, title: name[0].toUpperCase() + name.slice(1) })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { brand: 'aurora' },
  decorators: [
    (Story, context) => (
      <SafeAreaProvider>
        <Fonts>
          <ThemeProvider brand={context.globals.brand as BrandName}>
            <Canvas device={Boolean(context.parameters.device)}>
              <Story />
            </Canvas>
          </ThemeProvider>
        </Fonts>
      </SafeAreaProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
  },
};

export default preview;
