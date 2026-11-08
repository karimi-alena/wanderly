// url=https://www.figma.com/design/f2tSOfcWCn8dS1ePHl1uHh/Test-Figma2Code?node-id=24-154
// source=packages/ui/src/templates/PageTemplate.tsx
// component=PageTemplate
import figma from 'figma'

const instance = figma.selectedInstance
const str = (s: string) => JSON.stringify(s)

let header = ''
if (instance.getBoolean('Show header')) {
  const h = instance.findInstance('page header')
  if (h.type === 'INSTANCE') {
    const parts = [`title: ${str(h.getString('Title'))}`]
    if (h.getBoolean('Show back')) {
      const backLabel = h.getString('Back label')
      if (backLabel !== 'Back') parts.push(`backLabel: ${str(backLabel)}`)
      parts.push('onBack: () => router.back()')
    }
    header = ` header={{ ${parts.join(', ')} }}`
  }
}

const content = instance.getSlot('Content')
const bottom = instance.getBoolean('Show bottom bar') ? instance.getSlot('Bottom bar') : undefined

export default {
  example: bottom
    ? figma.tsx`<PageTemplate${header} bottomBar={<>${bottom}</>}>
  ${content ?? '{/* page content */}'}
</PageTemplate>`
    : figma.tsx`<PageTemplate${header}>
  ${content ?? '{/* page content */}'}
</PageTemplate>`,
  imports: ["import { PageTemplate } from '@wanderly/ui'"],
  id: 'template-page',
}
