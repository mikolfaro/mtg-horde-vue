import { action } from '@storybook/addon-actions'

import CardPile from '../components/CardPile.vue'
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
  cards: [],
  label: 'The pile'
}

export const withImage = Template.bind({})
withImage.args = {
  cards: [],
  label: 'The pile',
  background: backCard
}
