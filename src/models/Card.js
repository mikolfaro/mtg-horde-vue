import { Record } from 'immutable'

export default class Card extends Record({
  cardData: {}, tapped: false, index: 0, counters: {}, modifiers: {}, faceDown: false
}) {
  name() {
    return this.cardData.name
  }

  power() {
    return this.cardData.power
  }

  toughness() {
    return this.cardData.toughness
  }

  imageUrl() {
    return this.cardData.imageUrl
  }

  isToken() {
    return this.cardData.originalType.startsWith('Token')
  }

  isCreature() {
    return this.cardData.types && this.cardData.types.includes('Creature')
  }

  static freshFromData (cardData, i) {
    return new Card({ cardData: cardData, index: i })
  }
}
