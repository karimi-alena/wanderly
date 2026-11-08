import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Text, View } from 'react-native';
import { useTheme } from '../theme';
import { Button, buttonSizes, buttonVariants } from './Button';
import { iconNames } from './Icon';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { label: 'Plan a trip', variant: 'primary', size: 'medium', disabled: false, fullWidth: false },
  argTypes: {
    variant: { control: 'inline-radio', options: buttonVariants },
    size: { control: 'inline-radio', options: buttonSizes },
    icon: { control: 'select', options: [undefined, ...iconNames] },
    onPress: { action: 'pressed' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithIcon: Story = { args: { icon: 'search', label: 'Search stays' } };

export const FullWidth: Story = { args: { size: 'large', fullWidth: true, label: 'Save changes' } };

function Matrix() {
  const t = useTheme();
  const { spacer } = t.dimension;
  return (
    <View style={{ gap: spacer.sp24 }}>
      {buttonVariants.map((variant) => (
        <View key={variant} style={{ gap: spacer.sp8 }}>
          <Text style={[t.typography.label.md, { color: t.color.text.neutral.subtext, textTransform: 'capitalize' }]}>
            {variant}
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: spacer.sp12 }}>
            {buttonSizes.map((size) => (
              <Button key={size} variant={variant} size={size} label={size[0].toUpperCase() + size.slice(1)} />
            ))}
            <Button variant={variant} label="Disabled" disabled />
          </View>
        </View>
      ))}
    </View>
  );
}

export const AllVariants: Story = { name: 'All variants', render: () => <Matrix /> };
