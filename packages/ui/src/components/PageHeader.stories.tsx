import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme';
import { Button } from './Button';
import { PageHeader } from './PageHeader';

const meta = {
  title: 'Navigation/PageHeader',
  component: PageHeader,
  args: {
    title: 'Projects',
    eyebrow: 'Workspace',
    description: 'Track every project, who owns it, and what ships next.',
    backLabel: 'Back',
  },
  argTypes: { onBack: { action: 'back' } },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

function Frame({ children }: { children: ReactNode }) {
  const t = useTheme();
  return <View style={{ maxWidth: t.dimension.container.width.screen }}>{children}</View>;
}

export const Playground: Story = { render: (args) => <Frame><PageHeader {...args} /></Frame> };

export const InnerPage: Story = {
  name: 'Inner page with back',
  render: () => (
    <Frame>
      <PageHeader title="Personal details" backLabel="Profile" onBack={() => {}} trailingAction={{ icon: 'notifications', label: 'Notifications' }} />
    </Frame>
  ),
};

export const WithActions: Story = {
  name: 'With actions',
  render: () => (
    <Frame>
      <PageHeader
        title="Lisbon, Portugal"
        eyebrow="Trip"
        description="12–17 May · 2 travellers"
        backLabel="Trips"
        onBack={() => {}}
        actions={
          <>
            <View style={{ flex: 1 }}>
              <Button variant="secondary" label="Share" fullWidth />
            </View>
            <View style={{ flex: 1 }}>
              <Button label="Check in" fullWidth />
            </View>
          </>
        }
      />
    </Frame>
  ),
};
