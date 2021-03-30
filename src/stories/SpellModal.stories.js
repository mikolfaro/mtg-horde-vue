import SpellModal from '@/components/SpellModal'
import Modal from '@/components/Modal'
import Card from '@/models/Card'

export default {
  title: 'SpellModal'
}

const Template = (args, { argTypes }) => ({
  components: { SpellModal },
  template:
    '<div>' +
    '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n' +
    '<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>' +
    '<SpellModal v-bind="$props" />' +
    '</div>',
  props: Object.keys(argTypes)
})

export const open = Template.bind({})
open.args = {
  card: Card.freshFromData({
    name: "Back to Nature",
    imageUrl: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=383187&type=card",
    types: [
      "Instant"
    ],
  })
}
