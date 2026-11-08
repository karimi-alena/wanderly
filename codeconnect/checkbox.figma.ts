// url=https://www.figma.com/design/f2tSOfcWCn8dS1ePHl1uHh/Test-Figma2Code?node-id=20-218
// source=packages/ui/src/components/Checkbox.tsx
// component=Checkbox
import figma from 'figma'

const instance = figma.selectedInstance
const prop = figma.helpers.react.renderProp

const label = instance.getString('Label')
const checked = instance.getEnum('Checked', { true: 'true', false: 'false' })
const disabled = instance.getEnum('Disabled', { true: true, false: false })

export default {
  example: figma.tsx`<Checkbox${prop('label', label)} checked={${checked}} onChange={setChecked}${prop('disabled', disabled)} />`,
  imports: ["import { Checkbox } from '@wanderly/ui'"],
  id: 'checkbox',
  metadata: { nestable: true },
}
