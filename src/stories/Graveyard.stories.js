import { action } from '@storybook/addon-actions'

import Graveyard from '@/components/Graveyard'

export default {
  title: 'Graveyard',
}

const Template = (args, { argTypes }) => ({
  components: { Graveyard },
  template: '<Graveyard v-bind="$props" />',
  props: Object.keys(argTypes),
})

export const withNoCards = Template.bind({})
withNoCards.args = {
  cards: [],
}

export const withCards = Template.bind({})
withCards.args = {
  cards: [{
    name: 'Zombie',
    imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=409656&type=card'
  }]
}
