import { Pressable, Text, View } from 'react-native';
import { useTheme } from '../theme';
import { Icon } from './Icon';

export type AlertType = 'info' | 'success' | 'warning' | 'error';
export const alertTypes: AlertType[] = ['info', 'success', 'warning', 'error'];

const defaultTitles: Record<AlertType, string> = {
  info: 'Info',
  success: 'Success',
  warning: 'Warning',
  error: 'Error',
};

export type AlertProps = {
  type?: AlertType;
  /** Defaults to the type name, e.g. "Warning". */
  title?: string;
  message: string;
  /** Shows a close button when set. */
  onClose?: () => void;
};

export function Alert({ type = 'info', title, message, onClose }: AlertProps) {
  const t = useTheme();
  const { spacer, container, widthHeight } = t.dimension;
  // Extends the 24pt close icon to the 44pt minimum touch target.
  const slop = (container.touchTarget.min - widthHeight.wh24) / 2;

  return (
    <View
      role={type === 'error' || type === 'warning' ? 'alert' : 'status'}
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        gap: spacer.sp12,
        padding: container.paddingGap.cardMd,
        borderRadius: t.radius.md,
        borderWidth: t.borderWidth.thin,
        borderColor: t.color.border.feedback[type],
        backgroundColor: t.color.surface.feedback[type].surface,
      }}
    >
      <Icon name={type} tone={type} />
      <View style={{ flex: 1, gap: spacer.sp4 }}>
        <Text style={[t.typography.heading.sm, { color: t.color.text.feedback[type] }]}>{title ?? defaultTitles[type]}</Text>
        <Text style={[t.typography.body.sm, { color: t.color.text.neutral.body }]}>{message}</Text>
      </View>
      {onClose && (
        <Pressable role="button" aria-label="Dismiss" onPress={onClose} hitSlop={slop}>
          <Icon name="close" tone="muted" />
        </Pressable>
      )}
    </View>
  );
}
