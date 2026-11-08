import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Alert } from '../components/Alert';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Checkbox } from '../components/Checkbox';
import type { IconName } from '../components/Icon';
import { Input } from '../components/Input';
import { TabBar, TabBarItem } from '../components/TabBar';
import { PageTemplate } from './PageTemplate';
import { TabTemplate } from './TabTemplate';

const meta = {
  title: 'Templates',
  parameters: { device: true },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const tabs: { label: string; icon: IconName }[] = [
  { label: 'Explore', icon: 'explore' },
  { label: 'Trips', icon: 'trips' },
  { label: 'Saved', icon: 'saved' },
  { label: 'Inbox', icon: 'inbox' },
  { label: 'Profile', icon: 'profile' },
];

function TabExample({ empty }: { empty?: boolean }) {
  const [active, setActive] = useState('Explore');
  return (
    <TabTemplate
      title={active}
      topBarActions={[
        { icon: 'search', label: 'Search' },
        { icon: 'notifications', label: 'Notifications' },
      ]}
      tabBar={
        <TabBar>
          {tabs.map((tab) => (
            <TabBarItem key={tab.label} {...tab} active={tab.label === active} onPress={() => setActive(tab.label)} />
          ))}
        </TabBar>
      }
    >
      {!empty && (
        <>
          <Alert message="Your flight to Lisbon leaves in 3 days." />
          <Card
            image="placeholder"
            tag={{ label: 'Trending' }}
            title="Lisbon, Portugal"
            description="Sunny hills, tiled facades and pastéis de nata. 5 nights from €640."
            primaryAction={{ label: 'View' }}
            secondaryAction={{ label: 'Save' }}
          />
        </>
      )}
    </TabTemplate>
  );
}

export const TabEmpty: Story = { name: 'Tab template (empty)', render: () => <TabExample empty /> };
export const TabWithContent: Story = { name: 'Tab template (with content)', render: () => <TabExample /> };

function PageExample({ empty }: { empty?: boolean }) {
  const [weekly, setWeekly] = useState(true);
  return (
    <PageTemplate
      header={{ title: empty ? 'Page title' : 'Personal details', backLabel: 'Profile', onBack: () => {} }}
      bottomBar={empty ? undefined : <Button size="large" label="Save changes" fullWidth />}
    >
      {!empty && (
        <>
          <Input label="Full name" defaultValue="Jordan Lee" hint="Shown on your profile and in comments." />
          <Input label="Email" defaultValue="jordan@northwind.example" hint="We send sign-in links here." />
          <Input label="Phone" placeholder="Phone number" error="Enter a phone number with country code." />
          <Checkbox label="Email me a weekly summary" checked={weekly} onChange={setWeekly} />
        </>
      )}
    </PageTemplate>
  );
}

export const PageEmpty: Story = { name: 'Page template (empty)', render: () => <PageExample empty /> };
export const PageWithContent: Story = { name: 'Page template (with content)', render: () => <PageExample /> };
