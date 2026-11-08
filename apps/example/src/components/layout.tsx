// Small layout helpers shared by the example screens. All spacing comes from the theme.
import { Tag, useTheme, type TagVariant } from '@wanderly/ui';
import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

export const topBarActions = [
  { icon: 'search' as const, label: 'Search' },
  { icon: 'notifications' as const, label: 'Notifications' },
];

export function TagRow({ tags }: { tags: { label: string; variant?: TagVariant }[] }) {
  const t = useTheme();
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.dimension.spacer.sp8 }}>
      {tags.map((tag) => (
        <Tag key={tag.label} label={tag.label} variant={tag.variant ?? 'neutral'} />
      ))}
    </View>
  );
}

/** Bordered group for MenuItem lists. */
export function ListGroup({ children }: { children: ReactNode }) {
  const t = useTheme();
  return (
    <View
      style={{
        paddingVertical: t.dimension.spacer.sp4,
        borderRadius: t.radius.lg,
        borderWidth: t.borderWidth.thin,
        borderColor: t.color.border.neutral.base,
        backgroundColor: t.color.surface.neutral.base,
        overflow: 'hidden',
      }}
    >
      {children}
    </View>
  );
}

export function SectionHeader({ title, action }: { title: string; action?: ReactNode }) {
  const t = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.dimension.spacer.sp8 }}>
      <Text role="heading" style={[t.typography.heading.md, { flex: 1, color: t.color.text.neutral.body }]}>
        {title}
      </Text>
      {action}
    </View>
  );
}

export function Note({ children }: { children: string }) {
  const t = useTheme();
  return <Text style={[t.typography.body.sm, { color: t.color.text.neutral.subtext }]}>{children}</Text>;
}
