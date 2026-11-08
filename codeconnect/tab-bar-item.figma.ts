// url=https://www.figma.com/design/f2tSOfcWCn8dS1ePHl1uHh/Test-Figma2Code?node-id=25-89
// source=packages/ui/src/components/TabBar.tsx
// component=TabBarItem
import figma from 'figma'

const instance = figma.selectedInstance
const prop = figma.helpers.react.renderProp

const label = instance.getString('Label')
const icon = instance.getInstanceSwap('Icon')?.executeTemplate().metadata?.props?.name as string | undefined
const active = instance.getEnum('State', { Default: false, Active: true })

export default {
  example: figma.tsx`<TabBarItem${prop('label', label)}${prop('icon', icon)}${prop('active', active)} onPress={() => {}} />`,
  imports: ["import { TabBarItem } from '@wanderly/ui'"],
  id: 'tab-bar-item',
  metadata: { nestable: true },
}
