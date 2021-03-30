import CardModel from '@/models/Card'
import Card from '@/components/Card'

export default {
  title: 'Card',
}

const Template = (args, { argTypes }) => ({
  components: { Card },
  template: '<Card v-bind="$props" />',
  props: Object.keys(argTypes),
})

const cardImage = 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=39547&type=card'
const card = CardModel.freshFromData({
  name: 'Boneknitter',
  imageUrl: cardImage,
})

const creature = CardModel.freshFromData({
  name: 'Boneknitter',
  imageUrl: cardImage,
  power: '1',
  toughness: '1',
  types: ['Creature']
})

const morph = CardModel.freshFromData({
  name: 'Boneknitter',
  imageUrl: cardImage,
  power: '2',
  toughness: '2',
  types: ['Creature']
})

export const faceUp = Template.bind({})
faceUp.args = {
  card: card
}

export const faceDown = Template.bind({})
faceDown.args = {
  card: card.set('faceDown', true)
}

export const tapped = Template.bind({})
tapped.args = {
  card: card.set('tapped', true)
}

export const tappedAndFaceDown = Template.bind({})
tappedAndFaceDown.args = {
  card: card.set('faceDown', true).set('tapped', true)
}

export const creature1_1 = Template.bind({})
card.set('power', '1')
creature1_1.args = {
  card: creature
}

export const creature1_1Tapped = Template.bind({})
creature1_1Tapped.args = {
  card: creature.set("tapped", true)
}

export const morphedCreature = Template.bind({})
morphedCreature.args = {
  card: morph.set('faceDown', true)
}
