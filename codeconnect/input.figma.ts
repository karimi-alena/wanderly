// url=https://www.figma.com/design/f2tSOfcWCn8dS1ePHl1uHh/Test-Figma2Code?node-id=20-320
// source=packages/ui/src/components/Input.tsx
// component=Input
import figma from 'figma'

const instance = figma.selectedInstance
const prop = figma.helpers.react.renderProp

const label = instance.getString('Label')
const placeholder = instance.getString('Value')
const state = instance.getEnum('State', { Default: 'default', Focus: 'focus', Error: 'error', Disabled: 'disabled' })
const helper = instance.getBoolean('Show hint') ? instance.getString('Hint') : undefined
// In the Error state the helper text is the error message.
const hint = state === 'error' ? undefined : helper
const error = state === 'error' ? helper : undefined
const iconLayer = instance.getBoolean('Show icon') ? instance.findInstance('icon') : undefined
const iconName = iconLayer?.executeTemplate().metadata?.props?.name as string | undefined
const icon = iconName === 'placeholder' ? undefined : iconName

export default {
  example: figma.tsx`<Input${prop('label', label)}${prop('placeholder', placeholder)}${prop('hint', hint)}${prop('error', error)}${prop('icon', icon)}${prop('disabled', state === 'disabled')} value={value} onChangeText={setValue} />`,
  imports: ["import { Input } from '@wanderly/ui'"],
  id: 'input',
  metadata: { nestable: true },
}
