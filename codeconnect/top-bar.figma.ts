// url=https://www.figma.com/design/f2tSOfcWCn8dS1ePHl1uHh/Test-Figma2Code?node-id=25-60
// source=packages/ui/src/components/TopBar.tsx
// component=TopBar
import figma from 'figma'

const instance = figma.selectedInstance
const actions = [
  instance.getBoolean('Show search') ? "{ icon: 'search', label: 'Search', onPress: () => {} }" : undefined,
  instance.getBoolean('Show notifications') ? "{ icon: 'notifications', label: 'Notifications', onPress: () => {} }" : undefined,
].filter(Boolean)

export default {
  example: actions.length
    ? figma.tsx`<TopBar
  actions={[
    ${actions.join(',\n    ')},
  ]}
/>`
    : figma.tsx`<TopBar />`,
  imports: ["import { TopBar } from '@wanderly/ui'"],
  id: 'top-bar',
  metadata: { nestable: true },
}
