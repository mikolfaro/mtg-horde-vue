// import { action } from '@storybook/addon-actions'

import Game from '@/views/Game'

const Template = (args, { argTypes }) => ({
  components: { Game },
  template: '<Game v-bind="$props" />',
  props: Object.keys(argTypes)
})

export const start = Template.bind({})
start.args = {}
