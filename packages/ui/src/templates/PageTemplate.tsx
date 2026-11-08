import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PageHeader, type PageHeaderProps } from '../components/PageHeader';
import { useTheme } from '../theme';

export type PageTemplateProps = {
  /** Omit to hide the header. */
  header?: PageHeaderProps;
  /** Content slot: stacks vertically, full width, scrolls. */
  children?: ReactNode;
  /** Bottom bar slot for pinned actions, e.g. a full-width Save button. */
  bottomBar?: ReactNode;
};

/** Inner (pushed) screen: header with back button, scrolling content, optional pinned bottom bar. */
export function PageTemplate({ header, children, bottomBar }: PageTemplateProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const { spacer, margin } = t.dimension;
  return (
    <View style={{ flex: 1, backgroundColor: t.color.surface.neutral.muted }}>
      <View style={{ paddingTop: insets.top, backgroundColor: t.color.surface.neutral.base }}>
        {header && <PageHeader {...header} />}
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: margin.screen, gap: spacer.sp16 }}>
        {children}
      </ScrollView>
      {bottomBar && (
        <View
          style={{
            gap: spacer.sp12,
            paddingHorizontal: margin.screen,
            paddingTop: margin.screen,
            paddingBottom: Math.max(insets.bottom, margin.screen),
            backgroundColor: t.color.surface.neutral.base,
            borderTopWidth: t.borderWidth.thin,
            borderTopColor: t.color.border.neutral.base,
          }}
        >
          {bottomBar}
        </View>
      )}
    </View>
  );
}
