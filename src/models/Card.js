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

  tap() {
    return this.set('tapped', true)
  }

  untap() {
    return this.set('tapped', false)
  }

  imageUrl() {
    return this.cardData.imageUrl
  }

  isToken() {
    return this.cardData.types.includes('Token')
  }

  isPermanent() {
    const types = this.cardData.types
    return types.includes('Creature') ||
           types.includes('Artifact') ||
           types.includes('Enchantment')
  }

  isCreature() {
    return this.cardData.types && this.cardData.types.includes('Creature')
  }

  toString() {
    const string = `${this.index} ${this.name()}`
    return this.isCreature() ? `${string} ${this.power()}/${this.toughness()}` : string
  }

  static createFromCardData (cardData, i) {
    return new Card({ cardData: cardData, index: i })
  }
}
