// url=https://www.figma.com/design/f2tSOfcWCn8dS1ePHl1uHh/Test-Figma2Code?node-id=25-54
// source=packages/ui/src/components/Logo.tsx
// component=Logo
import figma from 'figma'

const name = figma.selectedInstance.getString('Name')

export default {
  example: figma.tsx`<Logo${figma.helpers.react.renderProp('name', name === 'Wanderly' ? undefined : name)} />`,
  imports: ["import { Logo } from '@wanderly/ui'"],
  id: 'logo',
  metadata: { nestable: true },
}
