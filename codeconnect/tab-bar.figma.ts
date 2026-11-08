// url=https://www.figma.com/design/f2tSOfcWCn8dS1ePHl1uHh/Test-Figma2Code?node-id=25-265
// source=packages/ui/src/components/TabBar.tsx
// component=TabBar
import figma from 'figma'

const active = figma.selectedInstance.getEnum('Active', {
  Explore: 'Explore',
  Trips: 'Trips',
  Saved: 'Saved',
  Inbox: 'Inbox',
  Profile: 'Profile',
})
const tabs = ['Explore', 'Trips', 'Saved', 'Inbox', 'Profile']
const items = tabs
  .map((label) => `<TabBarItem label="${label}" icon="${label.toLowerCase()}"${label === active ? ' active' : ''} onPress={() => {}} />`)
  .join('\n  ')

export default {
  example: figma.tsx`<TabBar>
  ${items}
</TabBar>`,
  imports: ["import { TabBar, TabBarItem } from '@wanderly/ui'"],
  id: 'tab-bar',
  metadata: { nestable: true },
}
