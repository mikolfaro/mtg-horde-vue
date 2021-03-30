import { Record } from 'immutable'

export default class Card extends Record({
  cardData: {}, tapped: false, index: 0, counters: {}, modifiers: {}
}) {

  power() {
    return this.cardData.power
  }

  toughness() {
    return this.cardData.toughness
  }

  isToken() {
    return this.cardData.originalType.startsWith('Token')
  }

  static freshFromData (cardData, i) {
    return new Card({ cardData: cardData, index: i })
  }
}
