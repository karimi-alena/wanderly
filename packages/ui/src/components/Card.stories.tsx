import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  args: {
    title: 'Lisbon, Portugal',
    description: 'Sunny hills, tiled facades and pastéis de nata. 5 nights from €640.',
    image: 'placeholder',
    tag: { label: 'Trending', variant: 'brand' },
    primaryAction: { label: 'View' },
    secondaryAction: { label: 'Save' },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

function Column({ children }: { children: ReactNode }) {
  const t = useTheme();
  return <View style={{ maxWidth: t.dimension.container.width.content, gap: t.dimension.spacer.sp16 }}>{children}</View>;
}

export const Playground: Story = { render: (args) => <Column><Card {...args} /></Column> };

export const Variations: Story = {
  render: () => (
    <Column>
      <Card
        image="placeholder"
        tag={{ label: 'Confirmed', variant: 'success' }}
        title="Lisbon, Portugal"
        description="12–17 May · 2 travellers · Casa Alfama"
        primaryAction={{ label: 'View trip' }}
        secondaryAction={{ label: 'Share' }}
      />
      <Card
        image="placeholder"
        tag={{ label: 'Stay', variant: 'info' }}
        title="Casa Alfama"
        description="Guesthouse with a rooftop view. €128 a night."
      />
      <Card
        tag={{ label: 'Planning', variant: 'warning' }}
        title="Kyoto, Japan"
        description="3–10 Oct · Flights not booked yet"
        primaryAction={{ label: 'Continue' }}
      />
    </Column>
  ),
};
