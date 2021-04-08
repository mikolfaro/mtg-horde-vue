import { action } from '@storybook/addon-actions'

import Card from '../models/Card'
import ListModal from '../components/ListModal'

export default {
  title: 'ListModal',
}

const Template = (args, { argTypes }) => ({
  components: { ListModal },
  template:
    '<div>' +
    '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n' +
    '<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>' +
    '<ListModal v-bind="$props" />' +
    '</div>',
  props: Object.keys(argTypes)
})

export const empty = Template.bind({})
empty.args = {
  title: "The card list",
  isOpen: true,
  cards: [],
}

let cards = [{
  "name": "Boneknitter",
  "power": "1",
  "toughness": "1",
  "imageUrl": "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=39547&type=card",
}, {
  "name": "Death Baron",
  "power": "2",
  "toughness": "2",
  "imageUrl": "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=205322&type=card",
}, {
  "name": "Infectious Horror",
  "power": "2",
  "toughness": "2",
  "imageUrl": "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=382290&type=card",
}, {
  "name": "Nocturnal Raid",
  "type": "Instant",
  "types": ["Instant"],
  "imageUrl": "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=3301&type=card"
}].map(cardData => Card.createFromCardData(cardData))

export const someCards = Template.bind({})
someCards.args = {
  title: "The card list",
  isOpen: true,
  cards: cards
}

cards = [
  {
    'name': 'Barter in Blood',
    'type': 'Sorcery',
    'types': ['Sorcery'],
    'imageUrl': 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=489208&type=card',
  },
  {
    'name': 'Delirium Skeins',
    'type': 'Sorcery',
    'types': ['Sorcery'],
    'imageUrl': 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=425890&type=card',
  },
  {
    'name': 'Zombie',
    'type': ' Creature — Zombie',
    'types': [
      'Creature',
    ],
    'subtypes': [
      'Zombie',
    ],
    'power': '2',
    'toughness': '2',
    'imageUrl': 'https://static.cardmarket.com/img/28bf07f9097fdc9806419e48d1b66e2e/items/1/XM21/477554.jpg',
    'id': 'e5eff329472998514ad2803a16b8ff8cec1fd793',
  },
  {
    'name': 'Barter in Blood',
    'type': 'Sorcery',
    'types': ['Sorcery'],
    'imageUrl': 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=489208&type=card',
  },
  {
    'name': 'Delirium Skeins',
    'type': 'Sorcery',
    'types': ['Sorcery'],
    'imageUrl': 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=425890&type=card',
  },
  {
    'name': 'Zombie',
    'type': ' Creature — Zombie',
    'types': [
      'Creature',
    ],
    'subtypes': [
      'Zombie',
    ],
    'rarity': 'Common',
    'set': 'DDQ',
    'setName': 'Duel Decks: Blessed vs. Cursed',
    'artist': 'Lucas Graciano',
    'number': '80',
    'power': '2',
    'toughness': '2',
    'layout': 'token',
    'multiverseid': 409656,
    'imageUrl': 'https://static.cardmarket.com/img/28bf07f9097fdc9806419e48d1b66e2e/items/1/XM21/477554.jpg',
    'foreignNames': [
      {
        'name': 'ゾンビ',
        'imageUrl': 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=409736&type=card',
        'language': 'Japanese',
        'multiverseid': 409736,
      },
    ],
    'printings': [
      'DDQ',
    ],
    'originalType': 'Token Creature — Zombie',
    'id': 'e5eff329472998514ad2803a16b8ff8cec1fd793',
  }
].map(cardData => Card.createFromCardData(cardData))

export const manyCards = Template.bind({})
manyCards.args = {
  title: "The card list",
  isOpen: true,
  cards: cards
}
