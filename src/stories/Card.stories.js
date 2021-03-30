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

export const faceUp = Template.bind({})
faceUp.args = {
  imageUrl: cardImage,
}

export const faceDown = Template.bind({})
faceDown.args = {
  imageUrl: cardImage,
  faceDown: true,
}

export const tapped = Template.bind({})
tapped.args = {
  imageUrl: cardImage,
  tapped: true,
}

export const tappedAndFaceDown = Template.bind({})
tappedAndFaceDown.args = {
  imageUrl: cardImage,
  tapped: true,
  faceDown: true,
}

export const creature1_1 = Template.bind({})
creature1_1.args = {
  imageUrl: cardImage,
  power: "1",
  toughness: "1"
}

export const creature11Tapped = Template.bind({})
creature11Tapped.args = {
  imageUrl: cardImage,
  power: "1",
  toughness: "1",
  tapped: true
}

export const morph = Template.bind({})
morph.args = {
  imageUrl: cardImage,
  faceDown: true,
  power: "2",
  toughness: "2",
}
