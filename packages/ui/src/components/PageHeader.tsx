import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '../theme';
import { Icon, type IconName } from './Icon';
import { IconButton } from './IconButton';

export type PageHeaderProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  /** Shows a back button in the nav bar when set. */
  onBack?: () => void;
  backLabel?: string;
  trailingAction?: { icon: IconName; label: string; onPress?: () => void };
  /** Full-width buttons under the title, e.g. two <Button fullWidth />. */
  actions?: ReactNode;
};

/** Inner-page header: nav bar (back + action), large title, description and optional actions. */
export function PageHeader({ title, eyebrow, description, onBack, backLabel = 'Back', trailingAction, actions }: PageHeaderProps) {
  const t = useTheme();
  const { spacer, container, margin, widthHeight } = t.dimension;
  const showNav = Boolean(onBack || trailingAction);

  return (
    <View
      style={{
        backgroundColor: t.color.surface.neutral.base,
        borderBottomWidth: t.borderWidth.thin,
        borderBottomColor: t.color.border.neutral.base,
      }}
    >
      {showNav && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            minHeight: container.touchTarget.min,
            paddingLeft: spacer.sp8,
            paddingRight: spacer.sp8,
          }}
        >
          <View style={{ flex: 1 }}>
            {onBack && (
              <Pressable
                role="button"
                aria-label={backLabel}
                onPress={onBack}
                style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', minHeight: container.touchTarget.min }}
              >
                <Icon name="chevron-left" tone="brand" size={widthHeight.wh24} />
                <Text style={[t.typography.body.md, { color: t.color.text.brand.active }]}>{backLabel}</Text>
              </Pressable>
            )}
          </View>
          {trailingAction && (
            <IconButton icon={trailingAction.icon} label={trailingAction.label} onPress={trailingAction.onPress} tone="brand" />
          )}
        </View>
      )}
      <View
        style={{
          gap: spacer.sp4,
          paddingHorizontal: margin.screen,
          paddingTop: showNav ? spacer.sp4 : margin.screen,
          paddingBottom: margin.screen,
        }}
      >
        {eyebrow && <Text style={[t.typography.label.md, { color: t.color.text.brand.active }]}>{eyebrow}</Text>}
        <Text role="heading" style={[t.typography.display.md, { color: t.color.text.neutral.body }]}>
          {title}
        </Text>
        {description && <Text style={[t.typography.body.md, { color: t.color.text.neutral.subtext }]}>{description}</Text>}
      </View>
      {actions && (
        <View style={{ flexDirection: 'row', gap: spacer.sp12, paddingHorizontal: margin.screen, paddingBottom: margin.screen }}>
          {actions}
        </View>
      )}
    </View>
  );
}
