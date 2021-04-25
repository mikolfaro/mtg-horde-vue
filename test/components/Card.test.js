import { render } from '@testing-library/vue'
import { expect } from 'chai'

import i18n from '@/i18n'
import Card from '@/components/Card'
import CardModel from '@/models/Card'
import VueI18n from 'vue-i18n'

describe('Card', () => {
  const aCreature = new CardModel({
    cardData: {
      name: "My Creature",
      types: ["Creature"],
      imageUrl: "https://test.test/my-creature.jpg"
    },
  })

  it('should display the card name and image', function () {
    const image = this.test.getByAltText("My Creature")
    expect(image.src).to.be.equal("https://test.test/my-creature.jpg")
  })

  beforeEach(function () {
    const { getByAltText } = render(Card, {
      props: {
        card: aCreature,
        canTap: true,
        canDestroy: false
      },
    }, (vue) => {
      vue.use(VueI18n)

      return { i18n }
    })

    this.currentTest.getByAltText = getByAltText
  })
})
