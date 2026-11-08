// url=https://www.figma.com/design/f2tSOfcWCn8dS1ePHl1uHh/Test-Figma2Code?node-id=21-56
// source=packages/ui/src/components/Card.tsx
// component=Card
import figma from 'figma'

const instance = figma.selectedInstance
const prop = figma.helpers.react.renderProp
const str = (s: string) => JSON.stringify(s)

const title = instance.getString('Title')
const description = instance.getString('Description')
const image = instance.getBoolean('Show image') ? ' image="placeholder"' : ''

let tag = ''
if (instance.getBoolean('Show tag')) {
  const tagProps = instance.findInstance('tag').executeTemplate().metadata?.props ?? {}
  const label = (tagProps.label as string | undefined) ?? 'Tag'
  const variant = tagProps.variant as string | undefined
  // Card defaults the tag variant to "brand".
  tag = variant && variant !== 'brand'
    ? ` tag={{ label: ${str(label)}, variant: ${str(variant)} }}`
    : ` tag={{ label: ${str(label)} }}`
}

let actions = ''
if (instance.getBoolean('Show actions')) {
  const buttons = instance.findConnectedInstances((node) => node.codeConnectId() === 'button')
  const labels = buttons.map((b) => (b.type === 'INSTANCE' ? b.getString('Label') : 'Action'))
  if (labels[0]) actions += ` primaryAction={{ label: ${str(labels[0])}, onPress: () => {} }}`
  if (labels[1]) actions += ` secondaryAction={{ label: ${str(labels[1])}, onPress: () => {} }}`
}

export default {
  example: figma.tsx`<Card${prop('title', title)}${prop('description', description)}${image}${tag}${actions} />`,
  imports: ["import { Card } from '@wanderly/ui'"],
  id: 'card',
  metadata: { nestable: true },
}
