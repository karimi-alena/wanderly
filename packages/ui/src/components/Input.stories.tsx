import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState, type ComponentProps } from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme';
import { iconNames } from './Icon';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    hint: 'We send sign-in links here.',
    disabled: false,
  },
  argTypes: {
    icon: { control: 'select', options: [undefined, ...iconNames] },
    error: { control: 'text' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

function Interactive(args: ComponentProps<typeof Input>) {
  const [value, setValue] = useState('');
  return <Input {...args} value={value} onChangeText={setValue} />;
}

export const Playground: Story = { render: (args) => <Interactive {...args} /> };

function AllStates() {
  const t = useTheme();
  return (
    <View style={{ gap: t.dimension.margin.stack, maxWidth: t.dimension.container.width.content }}>
      <Input label="Search" placeholder="Where do you want to go?" icon="search" />
      <Input label="Full name" defaultValue="Jordan Lee" hint="Shown on your profile and in comments." />
      <Input label="Phone" placeholder="Phone number" error="Enter a phone number with country code." />
      <Input label="Membership number" defaultValue="WND-20231184" hint="You can't change this." disabled />
    </View>
  );
}

export const AllStatesStory: Story = { name: 'All states', render: () => <AllStates /> };
