import CardPile from '../components/CardPile.vue'
import Card from '../models/Card'
import backCard from '../assets/back-card.png';

export default {
  title: 'CardPile',
}

const Template = (args, { argTypes }) => ({
  components: { CardPile },
  template: '<CardPile v-bind="$props" />',
  props: Object.keys(argTypes),
})

export const empty = Template.bind({})
empty.args = {
  cards: [],
  label: 'The pile'
}

export const withCards = Template.bind({})
withCards.args = {
  cards: [Card.createFromCardData({
    name: 'Zombie',
    imageUrl: 'https://static.cardmarket.com/img/28bf07f9097fdc9806419e48d1b66e2e/items/1/XM21/477554.jpg'
  })],
  label: 'The pile',
  background: backCard
}

export const withBackground = Template.bind({})
withBackground.args = {
  cards: [Card.createFromCardData({
    name: 'Zombie',
    imageUrl: 'https://static.cardmarket.com/img/28bf07f9097fdc9806419e48d1b66e2e/items/1/XM21/477554.jpg'
  })],
  label: 'The pile',
  background: 'https://static.cardmarket.com/img/28bf07f9097fdc9806419e48d1b66e2e/items/1/XM21/477554.jpg'
}
