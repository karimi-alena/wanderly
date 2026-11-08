// url=https://www.figma.com/design/f2tSOfcWCn8dS1ePHl1uHh/Test-Figma2Code?node-id=21-77
// source=packages/ui/src/components/PageHeader.tsx
// component=PageHeader
import figma from 'figma'

const instance = figma.selectedInstance
const prop = figma.helpers.react.renderProp
const str = (s: string) => JSON.stringify(s)

const title = instance.getString('Title')
const eyebrow = instance.getBoolean('Show eyebrow') ? instance.getString('Eyebrow') : undefined
const description = instance.getBoolean('Show description') ? instance.getString('Description') : undefined

let back = ''
if (instance.getBoolean('Show back')) {
  const backLabel = instance.getString('Back label')
  back = `${backLabel !== 'Back' ? ` backLabel=${str(backLabel)}` : ''} onBack={() => router.back()}`
}

let trailing = ''
if (instance.getBoolean('Show trailing icon')) {
  const icon = instance.getInstanceSwap('Trailing icon')?.executeTemplate().metadata?.props?.name as string | undefined
  if (icon) trailing = ` trailingAction={{ icon: ${str(icon)}, label: ${str(icon[0].toUpperCase() + icon.slice(1))}, onPress: () => {} }}`
}

const buttons = instance.getBoolean('Show actions')
  ? instance.findConnectedInstances((node) => node.codeConnectId() === 'button').map((b) => b.executeTemplate().example)
  : []

export default {
  example: buttons.length
    ? figma.tsx`<PageHeader${prop('title', title)}${prop('eyebrow', eyebrow)}${prop('description', description)}${back}${trailing}
  actions={
    <>
      ${buttons}
    </>
  }
/>`
    : figma.tsx`<PageHeader${prop('title', title)}${prop('eyebrow', eyebrow)}${prop('description', description)}${back}${trailing} />`,
  imports: ["import { PageHeader } from '@wanderly/ui'"],
  id: 'page-header',
  metadata: { nestable: true },
}
