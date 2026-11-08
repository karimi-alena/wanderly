import { Card, TabTemplate } from '@wanderly/ui';
import { Note, TagRow, topBarActions } from '../../components/layout';

export default function SavedScreen() {
  return (
    <TabTemplate title="Saved" topBarActions={topBarActions}>
      <TagRow tags={[{ label: 'All', variant: 'brand' }, { label: 'Places' }, { label: 'Stays' }, { label: 'Experiences' }]} />
      <Note>12 saved · 3 lists</Note>
      <Card
        image="placeholder"
        tag={{ label: 'Place' }}
        title="Pena Palace, Sintra"
        description="Day trip from Lisbon. Go early to beat the queues."
      />
      <Card
        image="placeholder"
        tag={{ label: 'Stay', variant: 'info' }}
        title="Casa Alfama"
        description="Guesthouse with a rooftop view. €128 a night."
      />
      <Card
        image="placeholder"
        tag={{ label: 'Experience', variant: 'success' }}
        title="Sunset sail on the Tagus"
        description="2 hours, small group, drinks included."
      />
    </TabTemplate>
  );
}
