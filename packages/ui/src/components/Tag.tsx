import { Text, View } from 'react-native';
import { useTheme, type Theme } from '../theme';

export type TagVariant = 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'info';
export const tagVariants: TagVariant[] = ['neutral', 'brand', 'success', 'warning', 'error', 'info'];

function tagColors(t: Theme, variant: TagVariant) {
  const { surface, text } = t.color;
  switch (variant) {
    case 'neutral':
      return { bg: surface.neutral.subtle, fg: text.neutral.body };
    case 'brand':
      return { bg: surface.brand.subtle, fg: text.brand.active };
    default:
      return { bg: surface.feedback[variant].surface, fg: text.feedback[variant] };
  }
}

export type TagProps = {
  label: string;
  variant?: TagVariant;
};

export function Tag({ label, variant = 'neutral' }: TagProps) {
  const t = useTheme();
  const { spacer } = t.dimension;
  const { bg, fg } = tagColors(t, variant);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: spacer.sp6,
        paddingHorizontal: spacer.sp8,
        paddingVertical: spacer.sp4,
        borderRadius: t.radius.full,
        backgroundColor: bg,
      }}
    >
      <View style={{ width: spacer.sp6, height: spacer.sp6, borderRadius: t.radius.full, backgroundColor: fg }} />
      <Text style={[t.typography.caption, { color: fg }]}>{label}</Text>
    </View>
  );
}
