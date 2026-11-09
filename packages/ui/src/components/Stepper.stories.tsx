import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState, type ComponentProps } from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme';
import { Stepper, stepperSizes } from './Stepper';

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  args: {
    label: 'Adults',
    description: 'Ages 13 or above',
    value: 2,
    min: 1,
    max: 8,
    step: 1,
    size: 'medium',
    showLabel: true,
    disabled: false,
  },
  argTypes: { size: { control: 'inline-radio', options: stepperSizes } },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

function Interactive(args: ComponentProps<typeof Stepper>) {
  const [value, setValue] = useState(args.value);
  return <Stepper {...args} value={value} onChange={setValue} />;
}

export const Playground: Story = { render: (args) => <Interactive {...args} /> };

function Guests() {
  const t = useTheme();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  return (
    <View style={{ gap: t.dimension.spacer.sp12 }}>
      <Stepper label="Adults" description="Ages 13 or above" value={adults} onChange={setAdults} min={1} max={8} />
      <Stepper label="Children" description="Ages 2–12" value={children} onChange={setChildren} max={6} />
      <Stepper label="Infants" description="Under 2" value={infants} onChange={setInfants} max={adults} />
    </View>
  );
}

export const GuestPicker: Story = { name: 'Guest picker', render: () => <Guests /> };

function AllStates() {
  const t = useTheme();
  return (
    <View style={{ gap: t.dimension.spacer.sp16 }}>
      <Stepper label="Medium" value={2} />
      <Stepper label="Small" value={2} size="small" />
      <Stepper label="At minimum" value={0} />
      <Stepper label="At maximum" value={99} />
      <Stepper label="Disabled" value={2} disabled />
      <Stepper label="Rooms" value={1} showLabel={false} />
      <Stepper label="Rooms" value={1} showLabel={false} size="small" />
    </View>
  );
}

export const AllStatesStory: Story = { name: 'All states', render: () => <AllStates /> };
