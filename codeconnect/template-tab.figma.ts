// url=https://www.figma.com/design/f2tSOfcWCn8dS1ePHl1uHh/Test-Figma2Code?node-id=25-279
// source=packages/ui/src/templates/TabTemplate.tsx
// component=TabTemplate
import figma from 'figma'

const instance = figma.selectedInstance
const prop = figma.helpers.react.renderProp

const title = instance.getBoolean('Show title') ? instance.getString('Title') : undefined
const topBar = instance.findInstance('top bar')
const actions =
  topBar.type === 'INSTANCE'
    ? [
        topBar.getBoolean('Show search') ? "{ icon: 'search', label: 'Search' }" : undefined,
        topBar.getBoolean('Show notifications') ? "{ icon: 'notifications', label: 'Notifications' }" : undefined,
      ].filter(Boolean)
    : []
const content = instance.getSlot('Content')

// The tab bar is rendered by the expo-router/ui navigator, so the screen leaves `tabBar` empty.
export default {
  example: figma.tsx`<TabTemplate${prop('title', title)}${actions.length ? ` topBarActions={[${actions.join(', ')}]}` : ''}>
  ${content ?? '{/* tab content */}'}
</TabTemplate>`,
  imports: ["import { TabTemplate } from '@wanderly/ui'"],
  id: 'template-tab',
}
