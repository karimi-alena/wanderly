// url=https://www.figma.com/design/f2tSOfcWCn8dS1ePHl1uHh/Test-Figma2Code?node-id=20-203
// source=packages/ui/src/components/Tag.tsx
// component=Tag
import figma from 'figma'

const instance = figma.selectedInstance
const prop = figma.helpers.react.renderProp

const variant = instance.getEnum('Style', {
  Neutral: undefined,
  Brand: 'brand',
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
  Info: 'info',
})
// The tag text is a layer override in Figma, not a component property.
const text = instance.findText('label')
const label = text.type === 'TEXT' ? text.textContent : 'Label'

export default {
  example: figma.tsx`<Tag${prop('label', label)}${prop('variant', variant)} />`,
  imports: ["import { Tag } from '@wanderly/ui'"],
  id: 'tag',
  metadata: { nestable: true, props: { label, variant } },
}
