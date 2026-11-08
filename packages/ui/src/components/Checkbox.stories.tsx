import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState, type ComponentProps } from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: { label: 'Email me a weekly summary', checked: true, disabled: false },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

function Interactive(args: ComponentProps<typeof Checkbox>) {
  const [checked, setChecked] = useState(args.checked);
  return <Checkbox {...args} checked={checked} onChange={setChecked} />;
}

export const Playground: Story = { render: (args) => <Interactive {...args} /> };

function AllStates() {
  const t = useTheme();
  return (
    <View style={{ gap: t.dimension.spacer.sp4 }}>
      <Checkbox label="Unchecked" checked={false} />
      <Checkbox label="Checked" checked />
      <Checkbox label="Disabled" checked={false} disabled />
      <Checkbox label="Checked and disabled" checked disabled />
    </View>
  );
}

export const AllStatesStory: Story = { name: 'All states', render: () => <AllStates /> };
