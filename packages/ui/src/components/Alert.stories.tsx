import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { useTheme } from '../theme';
import { Alert, alertTypes } from './Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  args: {
    type: 'info',
    message: 'Your flight to Lisbon leaves in 3 days. Check-in opens 24 hours before.',
  },
  argTypes: {
    type: { control: 'inline-radio', options: alertTypes },
    onClose: { action: 'closed' },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const messages = {
  info: 'Your flight to Lisbon leaves in 3 days. Check-in opens 24 hours before.',
  success: 'Profile updated. Your teammates see the new details right away.',
  warning: 'Prices for these dates are rising. Book soon to keep this rate.',
  error: 'We couldn’t save your trip. Check your connection and try again.',
};

function AllTypes() {
  const t = useTheme();
  return (
    <View style={{ gap: t.dimension.spacer.sp12, maxWidth: t.dimension.container.width.content }}>
      {alertTypes.map((type) => (
        <Alert key={type} type={type} message={messages[type]} onClose={() => {}} />
      ))}
      <Alert type="success" title="All caught up" message="Trip alerts are on. We’ll message you if anything changes." />
    </View>
  );
}

export const AllTypesStory: Story = { name: 'All types', render: () => <AllTypes /> };
