import { Pressable, Text } from 'react-native';
import { useTheme, type Theme } from '../theme';
import { Icon, type IconName } from './Icon';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';
export const buttonVariants: ButtonVariant[] = ['primary', 'secondary', 'ghost'];
export const buttonSizes: ButtonSize[] = ['small', 'medium', 'large'];

function sizeTokens(t: Theme, size: ButtonSize) {
  const { spacer, widthHeight, container } = t.dimension;
  switch (size) {
    case 'small':
      return { px: spacer.sp12, py: spacer.sp4, minHeight: widthHeight.wh32, text: t.typography.button.sm };
    case 'medium':
      return {
        px: container.paddingGap.buttonX,
        py: container.paddingGap.buttonY,
        minHeight: container.touchTarget.min,
        text: t.typography.button.md,
      };
    case 'large':
      return { px: spacer.sp24, py: spacer.sp12, minHeight: container.touchTarget.large, text: t.typography.button.md };
  }
}

// Buttons use their own color tokens so a brand can style them apart from other brand accents
// (Slate's buttons are green). Disabled stays neutral in every brand.
function variantTokens(t: Theme, variant: ButtonVariant, disabled: boolean, pressed: boolean) {
  const { surface, text, border, button } = t.color;
  if (variant === 'primary') {
    return {
      bg: disabled ? surface.neutral.dim : pressed ? button.primary.backgroundPressed : button.primary.background,
      fg: disabled ? text.neutral.disabled : button.primary.content,
    };
  }
  return {
    bg: pressed && !disabled ? button.secondary.backgroundPressed : variant === 'secondary' ? surface.neutral.base : 'transparent',
    fg: disabled ? text.neutral.disabled : button.secondary.content,
    border: variant === 'secondary' ? (disabled ? border.neutral.base : button.secondary.border) : undefined,
  };
}

export type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  /** Leading icon. */
  icon?: IconName;
  /** Stretch to the width of the parent instead of hugging the label. */
  fullWidth?: boolean;
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  icon,
  fullWidth = false,
}: ButtonProps) {
  const t = useTheme();
  const s = sizeTokens(t, size);
  return (
    <Pressable
      role="button"
      aria-disabled={disabled}
      aria-label={label}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => {
        const v = variantTokens(t, variant, disabled, pressed);
        return {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
          gap: t.dimension.spacer.sp8,
          minHeight: s.minHeight,
          paddingHorizontal: s.px,
          paddingVertical: s.py,
          borderRadius: t.radius.md,
          backgroundColor: v.bg,
          borderWidth: v.border ? t.borderWidth.thin : 0,
          borderColor: v.border,
        };
      }}
    >
      {({ pressed }) => {
        const v = variantTokens(t, variant, disabled, pressed);
        return (
          <>
            {icon && <Icon name={icon} color={v.fg} />}
            <Text style={[s.text, { color: v.fg }]}>{label}</Text>
          </>
        );
      }}
    </Pressable>
  );
}
