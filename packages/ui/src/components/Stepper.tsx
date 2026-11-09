import { Pressable, Text, View } from 'react-native';
import { useTheme, type Theme } from '../theme';
import { Icon } from './Icon';

export type StepperSize = 'small' | 'medium';
export const stepperSizes: StepperSize[] = ['small', 'medium'];

export type StepperProps = {
  /** What is being counted, e.g. "Adults". Always spoken; shown unless `showLabel` is false. */
  label: string;
  value: number;
  onChange?: (value: number) => void;
  /** Secondary line under the label, e.g. "Ages 13 or above". */
  description?: string;
  /** Hide the label and description and show only the − value + control. */
  showLabel?: boolean;
  min?: number;
  max?: number;
  step?: number;
  size?: StepperSize;
  disabled?: boolean;
};

function sizeTokens(t: Theme, size: StepperSize) {
  const { widthHeight } = t.dimension;
  return size === 'small'
    ? { button: widthHeight.wh32, icon: widthHeight.wh16, value: widthHeight.wh32 }
    : { button: widthHeight.wh40, icon: widthHeight.wh20, value: widthHeight.wh40 };
}

function StepButton({
  kind,
  label,
  enabled,
  onPress,
  size,
}: {
  kind: 'minus' | 'plus';
  label: string;
  enabled: boolean;
  onPress: () => void;
  size: ReturnType<typeof sizeTokens>;
}) {
  const t = useTheme();
  const { button, border, text } = t.color;
  // Grow the touch area to the 44pt minimum without changing the drawn size.
  const slop = Math.max(0, (t.dimension.container.touchTarget.min - size.button) / 2);
  return (
    <Pressable
      role="button"
      aria-label={(kind === 'minus' ? 'Decrease ' : 'Increase ') + label}
      aria-disabled={!enabled}
      disabled={!enabled}
      onPress={onPress}
      hitSlop={slop}
      style={({ pressed }) => ({
        width: size.button,
        height: size.button,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: t.radius.full,
        borderWidth: t.borderWidth.thin,
        borderColor: enabled ? button.secondary.border : border.neutral.base,
        backgroundColor: pressed && enabled ? button.secondary.backgroundPressed : 'transparent',
      })}
    >
      <Icon name={kind} size={size.icon} color={enabled ? button.secondary.content : text.neutral.disabled} />
    </Pressable>
  );
}

export function Stepper({
  label,
  value,
  onChange,
  description,
  showLabel = true,
  min = 0,
  max = 99,
  step = 1,
  size = 'medium',
  disabled = false,
}: StepperProps) {
  const t = useTheme();
  const s = sizeTokens(t, size);
  const { text } = t.color;
  const canDecrease = !disabled && value - step >= min;
  const canIncrease = !disabled && value + step <= max;
  const set = (next: number) => onChange?.(Math.min(max, Math.max(min, next)));

  const control = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.dimension.spacer.sp8 }}>
      <StepButton kind="minus" label={label} enabled={canDecrease} onPress={() => set(value - step)} size={s} />
      <Text
        aria-live="polite"
        aria-label={`${label}: ${value}`}
        style={[
          t.typography.label.md,
          { minWidth: s.value, textAlign: 'center', color: disabled ? text.neutral.disabled : text.neutral.body },
        ]}
      >
        {value}
      </Text>
      <StepButton kind="plus" label={label} enabled={canIncrease} onPress={() => set(value + step)} size={s} />
    </View>
  );

  if (!showLabel) {
    return (
      <View role="group" aria-label={label} style={{ alignSelf: 'flex-start' }}>
        {control}
      </View>
    );
  }

  return (
    <View
      role="group"
      aria-label={label}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: t.dimension.spacer.sp16,
        minHeight: t.dimension.container.touchTarget.min,
      }}
    >
      <View style={{ flex: 1, gap: t.dimension.spacer.sp2 }}>
        <Text style={[t.typography.body.md, { color: disabled ? text.neutral.disabled : text.neutral.body }]}>{label}</Text>
        {description ? (
          <Text style={[t.typography.body.sm, { color: disabled ? text.neutral.disabled : text.neutral.subtext }]}>
            {description}
          </Text>
        ) : null}
      </View>
      {control}
    </View>
  );
}
