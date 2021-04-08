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
const card = CardModel.createFromCardData({
  name: 'Boneknitter',
  imageUrl: cardImage,
})

const creature = CardModel.createFromCardData({
  name: 'Boneknitter',
  imageUrl: cardImage,
  power: '1',
  toughness: '1',
  types: ['Creature']
})

const morph = CardModel.createFromCardData({
  name: 'Boneknitter',
  imageUrl: cardImage,
  power: '2',
  toughness: '2',
  types: ['Creature']
})

export const faceUp = Template.bind({})
faceUp.args = {
  card: card,
  canTap: true,
  canDestroy: true,
}

export const faceDown = Template.bind({})
faceDown.args = {
  card: card.set('faceDown', true),
  canTap: false,
  canDestroy: true,
}

export const tapped = Template.bind({})
tapped.args = {
  card: card.set('tapped', true),
}

export const tappedAndFaceDown = Template.bind({})
tappedAndFaceDown.args = {
  card: card.set('faceDown', true).set('tapped', true),
  canTap: true,
  canDestroy: false,
}

export const creature1_1 = Template.bind({})
card.set('power', '1')
creature1_1.args = {
  card: creature,
  canTap: true,
  canDestroy: false,
}

export const creature1_1Tapped = Template.bind({})
creature1_1Tapped.args = {
  card: creature.set("tapped", true)
}

export const morphedCreature = Template.bind({})
morphedCreature.args = {
  card: morph.set('faceDown', true)
}
