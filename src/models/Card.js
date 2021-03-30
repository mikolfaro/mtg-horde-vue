import { Record } from 'immutable'

export default class Card extends Record({
  cardData: {}, tapped: false, index: 0, counters: {}, modifiers: {}
}) {

  power() {
    return this.cardData.get('power')
  }

  toughness() {
    return this.cardData.get('toughness')
  }

  isToken() {
    return this.cardData.originalType.startsWith('Token')
  }

  static freshFromData (cardData, i) {
    return new Card({ cardData: cardData, index: i })
  }
}
