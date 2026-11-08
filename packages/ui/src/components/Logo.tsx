import { Text, View } from 'react-native';
import { useTheme } from '../theme';
import { Icon } from './Icon';

export type LogoProps = {
  /** Wordmark text. */
  name?: string;
};

/** Brand mark + wordmark. Replace the mark with the real logo asset when there is one. */
export function Logo({ name = 'Wanderly' }: LogoProps) {
  const t = useTheme();
  const { spacer, widthHeight } = t.dimension;
  return (
    <View role="img" aria-label={name} style={{ flexDirection: 'row', alignItems: 'center', gap: spacer.sp8 }}>
      <View
        style={{
          width: widthHeight.wh32,
          height: widthHeight.wh32,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: t.radius.md,
          backgroundColor: t.color.surface.brand.solid,
        }}
      >
        <Icon name="explore" tone="inverse" size={widthHeight.wh20} />
      </View>
      <Text style={[t.typography.heading.md, { color: t.color.text.neutral.body }]}>{name}</Text>
    </View>
  );
}
