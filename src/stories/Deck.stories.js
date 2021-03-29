import { action } from '@storybook/addon-actions'

import Deck from '../components/Deck'

export default {
  title: 'Deck',
}

const Template = (args, { argTypes }) => ({
  components: { Deck },
  template: '<Deck v-bind="$props" />',
  props: Object.keys(argTypes),
})

export const withOneCard = Template.bind({})
withOneCard.args = {
  cards: [{
    name: 'Zombie'
  }]
}
