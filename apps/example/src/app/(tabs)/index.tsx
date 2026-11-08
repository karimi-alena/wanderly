import { Button, Card, Input, TabTemplate } from '@wanderly/ui';
import { SectionHeader, TagRow, topBarActions } from '../../components/layout';

export default function ExploreScreen() {
  return (
    <TabTemplate title="Explore" topBarActions={topBarActions}>
      <Input label="Search" placeholder="Where do you want to go?" icon="search" />
      <TagRow tags={[{ label: 'All', variant: 'brand' }, { label: 'Beaches' }, { label: 'Mountains' }, { label: 'Cities' }]} />
      <SectionHeader title="Popular destinations" action={<Button variant="ghost" size="small" label="See all" />} />
      <Card
        image="placeholder"
        tag={{ label: 'Trending' }}
        title="Lisbon, Portugal"
        description="Sunny hills, tiled facades and pastéis de nata. 5 nights from €640."
        primaryAction={{ label: 'View' }}
        secondaryAction={{ label: 'Save' }}
      />
      <Card
        image="placeholder"
        tag={{ label: 'Best in October', variant: 'success' }}
        title="Kyoto, Japan"
        description="Temples, tea houses and autumn leaves. 7 nights from €1,480."
        primaryAction={{ label: 'View' }}
        secondaryAction={{ label: 'Save' }}
      />
    </TabTemplate>
  );
}
