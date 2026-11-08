import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme';
import type { IconName } from './Icon';
import { TabBar, TabBarItem } from './TabBar';

const meta = {
  title: 'Navigation/TabBar',
  component: TabBar,
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const tabs: { label: string; icon: IconName }[] = [
  { label: 'Explore', icon: 'explore' },
  { label: 'Trips', icon: 'trips' },
  { label: 'Saved', icon: 'saved' },
  { label: 'Inbox', icon: 'inbox' },
  { label: 'Profile', icon: 'profile' },
];

function Interactive() {
  const t = useTheme();
  const [active, setActive] = useState('Explore');
  return (
    <View style={{ maxWidth: t.dimension.container.width.screen }}>
      <TabBar>
        {tabs.map((tab) => (
          <TabBarItem key={tab.label} {...tab} active={tab.label === active} onPress={() => setActive(tab.label)} />
        ))}
      </TabBar>
    </View>
  );
}

export const Travel: Story = { render: () => <Interactive /> };
