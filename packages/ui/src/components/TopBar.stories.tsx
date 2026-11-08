import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme';
import { Logo } from './Logo';
import { TopBar } from './TopBar';

const meta = {
  title: 'Navigation/TopBar',
  component: TopBar,
  args: {
    logoName: 'Wanderly',
    actions: [
      { icon: 'search', label: 'Search' },
      { icon: 'notifications', label: 'Notifications' },
    ],
  },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

function Frame({ children }: { children: ReactNode }) {
  const t = useTheme();
  return (
    <View style={{ maxWidth: t.dimension.container.width.screen, borderWidth: t.borderWidth.thin, borderColor: t.color.border.neutral.base }}>
      {children}
    </View>
  );
}

export const WithActions: Story = { render: (args) => <Frame><TopBar {...args} /></Frame> };
export const LogoOnly: Story = { args: { actions: [] }, render: (args) => <Frame><TopBar {...args} /></Frame> };
export const LogoOnBrand: Story = { name: 'Logo', render: () => <Logo /> };
