import { Button, Checkbox, MenuItem, TabTemplate, Tag, useTheme } from '@wanderly/ui';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { useBrandState } from '../../brand';
import { ListGroup, topBarActions } from '../../components/layout';

function ProfileSummary() {
  const t = useTheme();
  const { spacer, widthHeight, container } = t.dimension;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacer.sp16,
        padding: container.paddingGap.cardMd,
        borderRadius: t.radius.lg,
        borderWidth: t.borderWidth.thin,
        borderColor: t.color.border.neutral.base,
        backgroundColor: t.color.surface.neutral.base,
      }}
    >
      <View
        aria-hidden
        style={{
          width: widthHeight.wh64,
          height: widthHeight.wh64,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: t.radius.full,
          backgroundColor: t.color.surface.brand.subtle,
        }}
      >
        <Text style={[t.typography.heading.md, { color: t.color.text.brand.active }]}>JL</Text>
      </View>
      <View style={{ flex: 1, gap: spacer.sp4 }}>
        <Text style={[t.typography.heading.md, { color: t.color.text.neutral.body }]}>Jordan Lee</Text>
        <Text style={[t.typography.body.sm, { color: t.color.text.neutral.subtext }]}>Member since 2023 · 12 trips</Text>
        <Tag label="Gold member" variant="brand" />
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  const { brand, nextBrand } = useBrandState();
  const [deals, setDeals] = useState(true);
  return (
    <TabTemplate title="Profile" topBarActions={topBarActions}>
      <ProfileSummary />
      <ListGroup>
        <MenuItem icon="profile" label="Personal details" onPress={() => router.push('/details')} />
        <MenuItem icon="trips" label="Payment methods" />
        <MenuItem icon="explore" label="Travel preferences" />
        <MenuItem icon="notifications" label="Notifications" />
        <MenuItem
          icon="saved"
          label="Brand theme"
          trailing={brand[0].toUpperCase() + brand.slice(1)}
          onPress={nextBrand}
        />
        <MenuItem icon="inbox" label="Help and feedback" />
      </ListGroup>
      <Checkbox label="Email me deals on saved places" checked={deals} onChange={setDeals} />
      <Button variant="secondary" size="large" label="Sign out" fullWidth />
    </TabTemplate>
  );
}
