import { Alert, MenuItem, TabTemplate } from '@wanderly/ui';
import { ListGroup, TagRow, topBarActions } from '../../components/layout';

const messages = [
  { from: 'Ana · Casa Alfama', time: '2m', unread: true },
  { from: 'Wanderly Support', time: '1h' },
  { from: 'Ryokan Hana, Kyoto', time: 'Yesterday' },
  { from: 'Price drop: Lisbon flights', time: 'Mon' },
  { from: 'TAP Air Portugal', time: 'Apr 28' },
];

export default function InboxScreen() {
  return (
    <TabTemplate title="Inbox" topBarActions={topBarActions}>
      <TagRow tags={[{ label: 'All', variant: 'brand' }, { label: 'Hosts' }, { label: 'Support' }]} />
      <ListGroup>
        {messages.map((m) => (
          <MenuItem key={m.from} icon="inbox" label={m.from} trailing={m.time} selected={m.unread} />
        ))}
      </ListGroup>
      <Alert type="success" message="Trip alerts are on. We’ll message you if anything changes." />
    </TabTemplate>
  );
}
