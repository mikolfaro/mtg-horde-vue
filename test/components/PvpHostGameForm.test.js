import { render } from '@testing-library/vue'
// import { expect } from 'chai'
import sinon from 'sinon'

import VueI18n from 'vue-i18n'
import { auth } from '@/utils/firebase'
import i18n from '@/i18n'
import PvpHostGameForm from '@/components/PvpHostGameForm'

describe('PvpHostGameForm', function () {
  it('updates the player name when field is filled', function () {
    const playerNameInput = this.test.getByLabelText("Giocatori")
    playerNameInput.auth
  })

  it('creates a room on submit', () => {

  })

  it('emits an event with the room ID on submit', () => {

  })

  beforeEach(function () {
    sinon.stub(auth, "currentUser")

    const { getByAltText, getByLabelText } = render(PvpHostGameForm, {}, (vue) => {
      vue.use(VueI18n)

      return {i18n}
    })

    this.currentTest.getByAltText = getByAltText
    this.currentTest.getByLabelText = getByLabelText
  })
})
