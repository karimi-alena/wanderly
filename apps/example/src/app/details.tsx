import { Alert, Button, Checkbox, Input, PageTemplate } from '@wanderly/ui';
import { router } from 'expo-router';
import { useState } from 'react';

export default function PersonalDetailsScreen() {
  const [name, setName] = useState('Jordan Lee');
  const [email, setEmail] = useState('jordan@northwind.example');
  const [phone, setPhone] = useState('');
  const [weekly, setWeekly] = useState(true);
  const [saved, setSaved] = useState(false);
  const phoneError = saved && !phone.startsWith('+') ? 'Enter a phone number with country code, e.g. +351…' : undefined;

  return (
    <PageTemplate
      header={{ title: 'Personal details', backLabel: 'Profile', onBack: () => router.back() }}
      bottomBar={<Button size="large" label="Save changes" fullWidth onPress={() => setSaved(true)} />}
    >
      {saved && !phoneError && (
        <Alert type="success" message="Profile updated. Your details are saved." onClose={() => setSaved(false)} />
      )}
      <Input label="Full name" value={name} onChangeText={setName} hint="Shown on your profile and in comments." />
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        hint="We send sign-in links here."
      />
      <Input
        label="Phone"
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone number"
        keyboardType="phone-pad"
        error={phoneError}
        hint="Include your country code."
      />
      <Checkbox label="Email me a weekly summary" checked={weekly} onChange={setWeekly} />
    </PageTemplate>
  );
}
