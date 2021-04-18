import Deck from '../components/Deck'
import Card from '../models/Card'

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
  cards: [Card.createFromCardData({
    name: 'Zombie'
  })]
}
