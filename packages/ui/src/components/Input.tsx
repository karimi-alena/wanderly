import { useState } from 'react';
import { Text, TextInput, View, type TextInputProps } from 'react-native';
import { useTheme } from '../theme';
import { Icon, type IconName } from './Icon';

export type InputProps = Omit<TextInputProps, 'style' | 'editable' | 'placeholderTextColor'> & {
  label: string;
  /** Helper text under the field. Replaced by `error` when that is set. */
  hint?: string;
  /** Error message. Turns the field red and replaces the hint. */
  error?: string;
  disabled?: boolean;
  /** Trailing icon inside the field. */
  icon?: IconName;
};

export function Input({ label, hint, error, disabled = false, icon, onFocus, onBlur, ...inputProps }: InputProps) {
  const t = useTheme();
  const [focused, setFocused] = useState(false);
  const { color } = t;
  const { spacer, container } = t.dimension;

  const borderColor = error
    ? color.border.feedback.error
    : focused ? color.border.brand.focus
    : disabled ? color.border.neutral.base
    : color.border.neutral.strong;
  const borderWidth = error || focused ? t.borderWidth.thick : t.borderWidth.thin;
  // Shrink padding by the extra border so text doesn't shift when the border thickens.
  const extraBorder = borderWidth - t.borderWidth.thin;
  const message = error ?? hint;

  return (
    <View style={{ gap: spacer.sp6, alignSelf: 'stretch' }}>
      <Text style={[t.typography.label.md, { color: disabled ? color.text.neutral.disabled : color.text.neutral.body }]}>
        {label}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacer.sp8,
          minHeight: container.touchTarget.comfortable,
          paddingHorizontal: container.paddingGap.inputX - extraBorder,
          paddingVertical: container.paddingGap.inputY - extraBorder,
          borderRadius: t.radius.sm,
          borderWidth,
          borderColor,
          backgroundColor: disabled ? color.surface.neutral.subtle : color.surface.neutral.base,
        }}
      >
        <TextInput
          {...inputProps}
          editable={!disabled}
          aria-label={label}
          aria-disabled={disabled}
          placeholderTextColor={color.text.neutral.muted}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          style={{
            flex: 1,
            padding: 0,
            fontFamily: t.typography.body.md.fontFamily,
            fontSize: t.typography.body.md.fontSize,
            color: disabled ? color.text.neutral.disabled : color.text.neutral.body,
            // The field border is the focus indicator; drop the browser's default ring on web.
            outlineStyle: 'solid',
            outlineWidth: 0,
          }}
        />
        {icon && <Icon name={icon} tone={disabled ? 'disabled' : error ? 'error' : 'muted'} />}
      </View>
      {message && (
        <Text style={[t.typography.body.sm, { color: error ? color.text.feedback.error : disabled ? color.text.neutral.disabled : color.text.neutral.muted }]}>
          {message}
        </Text>
      )}
    </View>
  );
}
