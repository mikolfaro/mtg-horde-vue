import CardZone from '@/components/CardZone'

export default {
  title: 'CardZone',
}

const Template = (args, { argTypes }) => ({
  components: { CardZone },
  template: '<CardZone v-bind="$props" />',
  props: Object.keys(argTypes),
})

export const withCards = Template.bind({})
withCards.args = {
  cards: [
    {
      cardData: {imageUrl: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=39547&type=card'},
      tapped: true
    },
    {
      cardData: {imageUrl: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=39547&type=card'},
      tapped: false
    },
    {
      cardData: {imageUrl: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=39547&type=card'},
      tapped: true
    },
    {
      cardData: {imageUrl: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=39547&type=card'},
      tapped: true
    }
  ]
}
