import Hand from '@/components/Hand'

export default {
  title: 'Hand'
}

const card = {
  name: 'Zombie',
  imageUrl: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=409656&type=card'
}

const Template = (args, { argTypes }) => ({
  components: { Hand },
  template: '<Hand v-bind="$props" />',
  props: Object.keys(argTypes)
})

export const withNoCards = Template.bind({})
withNoCards.args = {
  cards: []
}

export const withOneCard = Template.bind({})
withOneCard.args = {
  cards: [card]
}

export const withTenCards = Template.bind({})
withTenCards.args = {
  cards: [card, card, card, card, card, card, card, card, card, card]
}
