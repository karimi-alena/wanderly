import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { useTheme } from '../theme';
import { Tag, tagVariants } from './Tag';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  args: { label: 'Trending', variant: 'brand' },
  argTypes: { variant: { control: 'select', options: tagVariants } },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

function AllVariants() {
  const t = useTheme();
  const labels = { neutral: 'Planned', brand: 'Trending', success: 'Confirmed', warning: 'Planning', error: 'Cancelled', info: 'Stay' };
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.dimension.spacer.sp8 }}>
      {tagVariants.map((v) => (
        <Tag key={v} variant={v} label={labels[v]} />
      ))}
    </View>
  );
}

export const AllVariantsStory: Story = { name: 'All variants', render: () => <AllVariants /> };
