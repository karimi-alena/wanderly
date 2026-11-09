// url=https://www.figma.com/design/f2tSOfcWCn8dS1ePHl1uHh/Test-Figma2Code?node-id=49-239
// source=packages/ui/src/components/Stepper.tsx
// component=Stepper
import figma from 'figma'

const instance = figma.selectedInstance
const prop = figma.helpers.react.renderProp

const label = instance.getString('Label')
const showLabel = instance.getBoolean('Show label')
const description = showLabel ? instance.getString('Description') : undefined
const size = instance.getEnum('Size', { small: 'small', medium: undefined })
const state = instance.getEnum('State', { default: 'default', min: 'min', max: 'max', disabled: 'disabled' })
// The min and max variants show the code defaults (0 and 99); the others use the Value property.
const value = state === 'min' ? '0' : state === 'max' ? '99' : instance.getString('Value')

export default {
  example: figma.tsx`<Stepper${prop('label', label)}${prop('description', description)} value={${value}} onChange={setCount}${prop('size', size)}${showLabel ? '' : ' showLabel={false}'}${state === 'disabled' ? ' disabled' : ''} />`,
  imports: ["import { Stepper } from '@wanderly/ui'"],
  id: 'stepper',
  metadata: { nestable: true },
}
