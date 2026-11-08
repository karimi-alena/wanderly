import { Pressable, Text, View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import { Icon, type IconName } from './Icon';

export type TabBarProps = ViewProps;

/**
 * Bottom tab bar container. Put <TabBarItem>s inside. Works on its own, or as
 * `<TabList asChild><TabBar>…</TabBar></TabList>` with expo-router/ui.
 */
export function TabBar({ style, children, ...rest }: TabBarProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const { spacer } = t.dimension;
  return (
    <View
      role="tablist"
      {...rest}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          paddingHorizontal: spacer.sp8,
          paddingTop: spacer.sp2,
          // Device home-indicator inset on phones; a small gap where there is none (web).
          paddingBottom: Math.max(insets.bottom, spacer.sp8),
          backgroundColor: t.color.surface.neutral.base,
          borderTopWidth: t.borderWidth.thin,
          borderTopColor: t.color.border.neutral.base,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export type TabBarItemProps = {
  label: string;
  icon: IconName;
  active?: boolean;
  /** Set by expo-router's <TabTrigger asChild>. */
  isFocused?: boolean;
  onPress?: () => void;
};

export function TabBarItem({ label, icon, active, isFocused, onPress }: TabBarItemProps) {
  const t = useTheme();
  const { spacer, container } = t.dimension;
  const selected = active ?? isFocused ?? false;
  return (
    <Pressable
      role="tab"
      aria-label={label}
      aria-selected={selected}
      onPress={onPress}
      style={{
        flex: 1,
        alignItems: 'center',
        gap: spacer.sp2,
        minHeight: container.touchTarget.comfortable,
        paddingTop: spacer.sp6,
        paddingBottom: spacer.sp4,
      }}
    >
      <Icon name={icon} tone={selected ? 'brand' : 'muted'} />
      <Text style={[t.typography.caption, { color: selected ? t.color.text.brand.active : t.color.text.neutral.muted }]}>
        {label}
      </Text>
    </Pressable>
  );
}
