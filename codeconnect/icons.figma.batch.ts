import figma from 'figma'

// One template for every icon/* component. `name` is exposed as metadata so parent
// templates (Button, MenuItem, TabBarItem, PageHeader) can render `icon="search"`.
export default {
  example: figma.tsx`<Icon name="${figma.batch.iconName}" />`,
  imports: ["import { Icon } from '@wanderly/ui'"],
  id: figma.batch.id,
  metadata: { nestable: true, props: { name: figma.batch.iconName } },
}
