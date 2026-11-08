import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme';
import { iconNames } from './Icon';
import { MenuItem } from './MenuItem';

const meta = {
  title: 'Components/MenuItem',
  component: MenuItem,
  args: { label: 'Personal details', icon: 'profile', selected: false, disabled: false },
  argTypes: {
    icon: { control: 'select', options: [undefined, ...iconNames] },
    trailing: { control: 'text' },
    onPress: { action: 'pressed' },
  },
} satisfies Meta<typeof MenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

function Group({ children }: { children: ReactNode }) {
  const t = useTheme();
  return (
    <View
      style={{
        maxWidth: t.dimension.container.width.content,
        paddingVertical: t.dimension.spacer.sp4,
        borderRadius: t.radius.lg,
        borderWidth: t.borderWidth.thin,
        borderColor: t.color.border.neutral.base,
        backgroundColor: t.color.surface.neutral.base,
        overflow: 'hidden',
      }}
    >
      {children}
    </View>
  );
}

export const SettingsList: Story = {
  name: 'Settings list',
  render: () => (
    <Group>
      <MenuItem icon="profile" label="Personal details" />
      <MenuItem icon="trips" label="Payment methods" />
      <MenuItem icon="explore" label="Travel preferences" />
      <MenuItem icon="notifications" label="Notifications" />
      <MenuItem icon="inbox" label="Help and feedback" disabled />
    </Group>
  ),
};

export const InboxList: Story = {
  name: 'Inbox list',
  render: () => (
    <Group>
      <MenuItem icon="inbox" label="Ana · Casa Alfama" trailing="2m" selected />
      <MenuItem icon="inbox" label="Wanderly Support" trailing="1h" />
      <MenuItem icon="inbox" label="Ryokan Hana, Kyoto" trailing="Yesterday" />
      <MenuItem icon="inbox" label="Price drop: Lisbon flights" trailing="Mon" />
    </Group>
  ),
};
