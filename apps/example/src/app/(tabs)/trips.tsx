import { Alert, Button, Card, Stepper, TabTemplate, useTheme } from '@wanderly/ui';
import { useState } from 'react';
import { View } from 'react-native';
import { Note, SectionHeader, TagRow, topBarActions } from '../../components/layout';

function plural(n: number, one: string, many: string) {
  return `${n} ${n === 1 ? one : many}`;
}

/** Who's travelling on the Kyoto trip. Infants can't outnumber adults (one lap each). */
function GuestPicker() {
  const t = useTheme();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [rooms, setRooms] = useState(1);

  const changeAdults = (n: number) => {
    setAdults(n);
    setInfants((i) => Math.min(i, n));
    setRooms((r) => Math.min(r, n));
  };

  const summary = [
    plural(adults + children, 'traveller', 'travellers'),
    infants ? plural(infants, 'infant', 'infants') : null,
    plural(rooms, 'room', 'rooms'),
  ].filter(Boolean).join(' · ');

  return (
    <View style={{ gap: t.dimension.spacer.sp12 }}>
      <SectionHeader title="Who's going to Kyoto?" />
      <View
        style={{
          padding: t.dimension.container.paddingGap.cardMd,
          gap: t.dimension.spacer.sp8,
          borderRadius: t.radius.lg,
          borderWidth: t.borderWidth.thin,
          borderColor: t.color.border.neutral.base,
          backgroundColor: t.color.surface.neutral.base,
        }}
      >
        <Stepper label="Adults" description="Ages 13 or above" value={adults} onChange={changeAdults} min={1} max={8} />
        <Stepper label="Children" description="Ages 2–12" value={children} onChange={setChildren} max={6} />
        <Stepper label="Infants" description="Under 2, on a lap" value={infants} onChange={setInfants} max={adults} />
        <Stepper label="Rooms" value={rooms} onChange={setRooms} min={1} max={adults} />
      </View>
      <Note>{summary}</Note>
    </View>
  );
}

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
      <GuestPicker />
      <Button variant="secondary" size="large" label="Plan a new trip" fullWidth />
    </TabTemplate>
  );
}
