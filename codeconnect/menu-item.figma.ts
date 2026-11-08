// url=https://www.figma.com/design/f2tSOfcWCn8dS1ePHl1uHh/Test-Figma2Code?node-id=21-26
// source=packages/ui/src/components/MenuItem.tsx
// component=MenuItem
import figma from 'figma'

const instance = figma.selectedInstance
const prop = figma.helpers.react.renderProp

const label = instance.getString('Label')
const iconSwap = instance.getBoolean('Show icon') ? instance.getInstanceSwap('Icon') : undefined
const icon = iconSwap?.executeTemplate().metadata?.props?.name as string | undefined
const showTrailing = instance.getBoolean('Show trailing')
const trailingText = instance.getString('Trailing')
// Code shows a chevron by default; "›" in Figma means the default.
const trailing = !showTrailing ? ' trailing={null}' : trailingText === '›' ? '' : prop('trailing', trailingText)
const selected = instance.getEnum('State', { Default: false, Pressed: false, Selected: true, Disabled: false })
const disabled = instance.getEnum('State', { Default: false, Pressed: false, Selected: false, Disabled: true })

export default {
  example: figma.tsx`<MenuItem${prop('label', label)}${prop('icon', icon)}${trailing}${prop('selected', selected)}${prop('disabled', disabled)} onPress={() => {}} />`,
  imports: ["import { MenuItem } from '@wanderly/ui'"],
  id: 'menu-item',
  metadata: { nestable: true },
}
