import { Pressable } from 'react-native';
import { useTheme } from '../theme';
import { Icon, type IconName, type IconTone } from './Icon';

export type IconButtonProps = {
  icon: IconName;
  /** Spoken label; icon-only buttons need one. */
  label: string;
  onPress?: () => void;
  tone?: IconTone;
};

export function IconButton({ icon, label, onPress, tone = 'body' }: IconButtonProps) {
  const t = useTheme();
  const size = t.dimension.container.touchTarget.min;
  return (
    <Pressable
      role="button"
      aria-label={label}
      onPress={onPress}
      style={({ pressed }) => ({
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: t.radius.full,
        backgroundColor: pressed ? t.color.surface.neutral.subtle : 'transparent',
      })}
    >
      <Icon name={icon} tone={tone} />
    </Pressable>
  );
}
