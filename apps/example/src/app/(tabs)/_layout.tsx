import { TabBar, TabBarItem, type IconName } from '@wanderly/ui';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';

const tabs: { name: string; href: '/' | '/trips' | '/saved' | '/inbox' | '/profile'; label: string; icon: IconName }[] = [
  { name: 'index', href: '/', label: 'Explore', icon: 'explore' },
  { name: 'trips', href: '/trips', label: 'Trips', icon: 'trips' },
  { name: 'saved', href: '/saved', label: 'Saved', icon: 'saved' },
  { name: 'inbox', href: '/inbox', label: 'Inbox', icon: 'inbox' },
  { name: 'profile', href: '/profile', label: 'Profile', icon: 'profile' },
];

export default function TabsLayout() {
  return (
    <Tabs>
      {/* TabSlot defaults to flex-basis auto and would grow past the screen, pushing the bar off it. */}
      <TabSlot style={{ flex: 1 }} />
      <TabList asChild>
        <TabBar>
          {tabs.map((tab) => (
            <TabTrigger key={tab.name} name={tab.name} href={tab.href} asChild>
              <TabBarItem label={tab.label} icon={tab.icon} />
            </TabTrigger>
          ))}
        </TabBar>
      </TabList>
    </Tabs>
  );
}
