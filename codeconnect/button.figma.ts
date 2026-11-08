// url=https://www.figma.com/design/f2tSOfcWCn8dS1ePHl1uHh/Test-Figma2Code?node-id=20-291
// source=packages/ui/src/components/Button.tsx
// component=Button
import figma from 'figma'

const instance = figma.selectedInstance
const prop = figma.helpers.react.renderProp

const label = instance.getString('Label')
// Defaults (primary, medium) are left out of the snippet.
const variant = instance.getEnum('Style', { Primary: undefined, Secondary: 'secondary', Ghost: 'ghost' })
const size = instance.getEnum('Size', { Small: 'small', Medium: undefined, Large: 'large' })
const disabled = instance.getEnum('State', { Default: false, Disabled: true })
const iconSwap = instance.getBoolean('Show icon') ? instance.getInstanceSwap('Icon') : undefined
const icon = iconSwap?.executeTemplate().metadata?.props?.name as string | undefined

export default {
  example: figma.tsx`<Button${prop('label', label)}${prop('variant', variant)}${prop('size', size)}${prop('icon', icon)}${prop('disabled', disabled)} />`,
  imports: ["import { Button } from '@wanderly/ui'"],
  id: 'button',
  metadata: { nestable: true },
}
