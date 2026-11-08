import type { ReactElement } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { useTheme, type Theme } from '../theme';

// Same 24×24 line glyphs as the Figma icon components.
const glyphs = {
  explore: (
    <>
      <Circle cx={12} cy={12} r={9} />
      <Path d="M15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5Z" />
    </>
  ),
  trips: (
    <>
      <Rect x={3} y={7} width={18} height={13} rx={2} />
      <Path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
      <Path d="M3 13h18" />
    </>
  ),
  saved: <Path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z" />,
  inbox: <Path d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H10l-5 4V6a1 1 0 0 1 1-1Z" />,
  profile: (
    <>
      <Circle cx={12} cy={8} r={4} />
      <Path d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6" />
    </>
  ),
  search: (
    <>
      <Circle cx={11} cy={11} r={7} />
      <Path d="m20 20-4-4" />
    </>
  ),
  notifications: (
    <>
      <Path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4l2-2Z" />
      <Path d="M10 21a2 2 0 0 0 4 0" />
    </>
  ),
  check: <Path d="M5 12.5 10 17 19 7" />,
  close: <Path d="M6 6l12 12M18 6 6 18" />,
  'chevron-right': <Path d="m9 5 7 7-7 7" />,
  'chevron-left': <Path d="m15 5-7 7 7 7" />,
  info: (
    <>
      <Circle cx={12} cy={12} r={9} />
      <Path d="M12 11v5M12 8h.01" />
    </>
  ),
  success: (
    <>
      <Circle cx={12} cy={12} r={9} />
      <Path d="m8.5 12.5 2.5 2.5 4.5-5" />
    </>
  ),
  warning: (
    <>
      <Path d="M10.3 4.2 2.8 17.5A2 2 0 0 0 4.5 20.5h15a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0Z" />
      <Path d="M12 10v4M12 17h.01" />
    </>
  ),
  error: (
    <>
      <Circle cx={12} cy={12} r={9} />
      <Path d="m9 9 6 6M15 9l-6 6" />
    </>
  ),
  image: (
    <>
      <Rect x={3} y={4} width={18} height={16} rx={2} />
      <Circle cx={8.5} cy={9.5} r={1.5} />
      <Path d="m21 16-5-5-9 9" />
    </>
  ),
  placeholder: <Rect x={3} y={3} width={18} height={18} rx={4} />,
} satisfies Record<string, ReactElement>;

export type IconName = keyof typeof glyphs;
export const iconNames = Object.keys(glyphs) as IconName[];

export type IconTone = 'body' | 'muted' | 'disabled' | 'inverse' | 'brand' | 'success' | 'warning' | 'error' | 'info';

export function iconColor(t: Theme, tone: IconTone): string {
  const c = t.color.icon;
  switch (tone) {
    case 'body':
    case 'muted':
    case 'disabled':
    case 'inverse':
      return c.neutral[tone];
    case 'brand':
      return c.brand.active;
    default:
      return c.feedback[tone];
  }
}

export type IconProps = {
  name: IconName;
  tone?: IconTone;
  /** Defaults to the 24pt icon size token. */
  size?: number;
  accessibilityLabel?: string;
};

export function Icon({ name, tone = 'body', size, accessibilityLabel }: IconProps) {
  const t = useTheme();
  const px = size ?? t.dimension.widthHeight.wh24;
  const color = iconColor(t, tone);
  const filled = name === 'placeholder';
  // Accessibility lives on the wrapper: react-native-svg forwards unknown props straight to the DOM on web.
  return (
    <View
      role={accessibilityLabel ? 'img' : undefined}
      aria-label={accessibilityLabel}
      aria-hidden={!accessibilityLabel}
      style={{ width: px, height: px }}
    >
      <Svg
        width={px}
        height={px}
        viewBox="0 0 24 24"
        fill={filled ? color : 'none'}
        stroke={filled ? 'none' : color}
        strokeWidth={t.borderWidth.thick}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {glyphs[name]}
      </Svg>
    </View>
  );
}
