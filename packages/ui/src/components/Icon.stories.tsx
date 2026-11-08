import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Text, View } from 'react-native';
import { useTheme } from '../theme';
import { Icon, iconNames, type IconTone } from './Icon';

const tones: IconTone[] = ['body', 'muted', 'disabled', 'brand', 'success', 'warning', 'error', 'info'];

const meta = {
  title: 'Components/Icon',
  component: Icon,
  args: { name: 'explore', tone: 'body' },
  argTypes: {
    name: { control: 'select', options: iconNames },
    tone: { control: 'select', options: [...tones, 'inverse'] },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

function AllIcons() {
  const t = useTheme();
  const { spacer } = t.dimension;
  return (
    <View style={{ gap: spacer.sp24 }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacer.sp16 }}>
        {iconNames.map((name) => (
          <View key={name} style={{ alignItems: 'center', gap: spacer.sp4, width: t.dimension.widthHeight.wh72 }}>
            <Icon name={name} />
            <Text style={[t.typography.caption, { color: t.color.text.neutral.subtext }]}>{name}</Text>
          </View>
        ))}
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacer.sp16 }}>
        {tones.map((tone) => (
          <View key={tone} style={{ alignItems: 'center', gap: spacer.sp4, width: t.dimension.widthHeight.wh72 }}>
            <Icon name="saved" tone={tone} />
            <Text style={[t.typography.caption, { color: t.color.text.neutral.subtext }]}>{tone}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export const AllIconsAndTones: Story = { render: () => <AllIcons /> };
