import { View } from 'react-native';
import { useTheme } from '../theme';
import type { IconName } from './Icon';
import { IconButton } from './IconButton';
import { Logo } from './Logo';

export type TopBarAction = { icon: IconName; label: string; onPress?: () => void };

export type TopBarProps = {
  /** Icon buttons on the right, e.g. search and notifications. */
  actions?: TopBarAction[];
  logoName?: string;
};

/** Top bar for root tab screens: logo on the left, actions on the right, no back button. */
export function TopBar({ actions = [], logoName }: TopBarProps) {
  const t = useTheme();
  const { spacer, container, margin } = t.dimension;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: container.touchTarget.large,
        paddingLeft: margin.screen,
        paddingRight: spacer.sp8,
        gap: spacer.sp4,
        backgroundColor: t.color.surface.neutral.base,
      }}
    >
      <View style={{ flex: 1 }}>
        <Logo name={logoName} />
      </View>
      {actions.map((a) => (
        <IconButton key={a.label} icon={a.icon} label={a.label} onPress={a.onPress} />
      ))}
    </View>
  );
}
