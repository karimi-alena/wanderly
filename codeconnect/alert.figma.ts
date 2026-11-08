// url=https://www.figma.com/design/f2tSOfcWCn8dS1ePHl1uHh/Test-Figma2Code?node-id=21-55
// source=packages/ui/src/components/Alert.tsx
// component=Alert
import figma from 'figma'

const instance = figma.selectedInstance
const prop = figma.helpers.react.renderProp

const type = instance.getEnum('Type', { Info: 'info', Success: 'success', Warning: 'warning', Error: 'error' })
const message = instance.getString('Message')
const titleLayer = instance.findText('title')
const titleText = titleLayer.type === 'TEXT' ? titleLayer.textContent : undefined
// The code component defaults the title to the type name ("Info", "Warning", …).
const defaultTitle = type ? type[0].toUpperCase() + type.slice(1) : undefined
const title = titleText && titleText !== defaultTitle ? titleText : undefined
const showClose = instance.getBoolean('Show close')

export default {
  example: figma.tsx`<Alert${prop('type', type === 'info' ? undefined : type)}${prop('title', title)}${prop('message', message)}${showClose ? ' onClose={() => setVisible(false)}' : ''} />`,
  imports: ["import { Alert } from '@wanderly/ui'"],
  id: 'alert',
  metadata: { nestable: true },
}
