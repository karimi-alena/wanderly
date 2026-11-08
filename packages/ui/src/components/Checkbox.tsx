import { Pressable, Text, View } from 'react-native';
import { useTheme } from '../theme';
import { Icon } from './Icon';

export type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
};

export function Checkbox({ label, checked, onChange, disabled = false }: CheckboxProps) {
  const t = useTheme();
  const { color } = t;
  const box = t.dimension.widthHeight.wh22;

  const fill = checked
    ? disabled ? color.surface.neutral.dim : color.surface.brand.solid
    : color.surface.neutral.base;
  const border = checked
    ? disabled ? color.border.neutral.strong : color.border.brand.active
    : disabled ? color.border.neutral.base : color.border.neutral.strong;

  return (
    <Pressable
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
      aria-label={label}
      disabled={disabled}
      onPress={() => onChange?.(!checked)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: t.dimension.spacer.sp12,
        minHeight: t.dimension.container.touchTarget.min,
      }}
    >
      <View
        style={{
          width: box,
          height: box,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: t.radius.sm,
          borderWidth: t.borderWidth.thick,
          borderColor: border,
          backgroundColor: fill,
        }}
      >
        {checked && <Icon name="check" tone={disabled ? 'disabled' : 'inverse'} size={t.dimension.widthHeight.wh16} />}
      </View>
      <Text style={[t.typography.body.md, { color: disabled ? color.text.neutral.disabled : color.text.neutral.body }]}>
        {label}
      </Text>
    </Pressable>
  );
}
