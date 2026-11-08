import { Pressable, Text } from 'react-native';
import { useTheme } from '../theme';
import { Icon, type IconName } from './Icon';

export type MenuItemProps = {
  label: string;
  onPress?: () => void;
  /** Leading icon. */
  icon?: IconName;
  /** Text on the right, e.g. a time or count. Shows a chevron when omitted; pass `null` to show nothing. */
  trailing?: string | null;
  selected?: boolean;
  disabled?: boolean;
};

export function MenuItem({ label, onPress, icon, trailing, selected = false, disabled = false }: MenuItemProps) {
  const t = useTheme();
  const { color } = t;
  const { spacer, container, margin } = t.dimension;
  const textColor = disabled ? color.text.neutral.disabled : selected ? color.text.brand.active : color.text.neutral.body;
  const iconTone = disabled ? 'disabled' : selected ? 'brand' : 'muted';

  return (
    <Pressable
      role="button"
      aria-label={label}
      aria-selected={selected}
      aria-disabled={disabled}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        gap: spacer.sp12,
        minHeight: container.touchTarget.comfortable,
        paddingHorizontal: margin.screen,
        paddingVertical: spacer.sp12,
        borderRadius: t.radius.md,
        backgroundColor: selected
          ? color.surface.brand.subtle
          : pressed ? color.surface.neutral.subtle
          : 'transparent',
      })}
    >
      {icon && <Icon name={icon} tone={iconTone} />}
      <Text style={[t.typography.body.md, { flex: 1, color: textColor }]} numberOfLines={1}>
        {label}
      </Text>
      {trailing === undefined ? (
        <Icon name="chevron-right" tone={disabled ? 'disabled' : 'muted'} size={t.dimension.widthHeight.wh20} />
      ) : trailing !== null ? (
        <Text style={[t.typography.body.md, { color: disabled ? color.text.neutral.disabled : color.text.neutral.muted }]}>
          {trailing}
        </Text>
      ) : null}
    </Pressable>
  );
}
