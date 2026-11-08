import { Alert, Button, Card, TabTemplate } from '@wanderly/ui';
import { useState } from 'react';
import { TagRow, topBarActions } from '../../components/layout';

export default function TripsScreen() {
  const [showAlert, setShowAlert] = useState(true);
  return (
    <TabTemplate title="Trips" topBarActions={topBarActions}>
      {showAlert && (
        <Alert
          type="info"
          message="Your flight to Lisbon leaves in 3 days. Check-in opens 24 hours before."
          onClose={() => setShowAlert(false)}
        />
      )}
      <TagRow tags={[{ label: 'Upcoming', variant: 'brand' }, { label: 'Past' }, { label: 'Drafts' }]} />
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
        tag={{ label: 'Planning', variant: 'warning' }}
        title="Kyoto, Japan"
        description="3–10 Oct · Flights not booked yet"
        primaryAction={{ label: 'Continue' }}
        secondaryAction={{ label: 'Share' }}
      />
      <Button variant="secondary" size="large" label="Plan a new trip" fullWidth />
    </TabTemplate>
  );
}
