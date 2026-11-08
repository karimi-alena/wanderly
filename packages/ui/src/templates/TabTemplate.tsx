import type { ReactNode } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TopBar, type TopBarAction } from '../components/TopBar';
import { useTheme } from '../theme';

export type TabTemplateProps = {
  /** Large title under the top bar. Omit to hide it. */
  title?: string;
  topBarActions?: TopBarAction[];
  logoName?: string;
  /** Content slot: stacks vertically, full width, scrolls. */
  children?: ReactNode;
  /**
   * Tab bar slot. Leave empty when a navigator (e.g. expo-router/ui Tabs) renders the bar
   * outside the screen.
   */
  tabBar?: ReactNode;
};

/** Root tab screen: logo top bar (no back), optional large title, scrolling content, tab bar. */
export function TabTemplate({ title, topBarActions, logoName, children, tabBar }: TabTemplateProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const { spacer, margin } = t.dimension;
  return (
    <View style={{ flex: 1, backgroundColor: t.color.surface.neutral.muted }}>
      <View
        style={{
          paddingTop: insets.top,
          backgroundColor: t.color.surface.neutral.base,
          borderBottomWidth: t.borderWidth.thin,
          borderBottomColor: t.color.border.neutral.base,
        }}
      >
        <TopBar actions={topBarActions} logoName={logoName} />
        {title && (
          <Text
            role="heading"
            style={[
              t.typography.display.md,
              {
                color: t.color.text.neutral.body,
                paddingHorizontal: margin.screen,
                paddingTop: spacer.sp4,
                paddingBottom: margin.screen,
              },
            ]}
          >
            {title}
          </Text>
        )}
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: margin.screen, gap: spacer.sp16 }}>
        {children}
      </ScrollView>
      {tabBar}
    </View>
  );
}
