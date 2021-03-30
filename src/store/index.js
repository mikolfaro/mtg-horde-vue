import Vue from 'vue'
import Vuex from 'vuex'
import { phases } from '../helpers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playersCount: 0,
    graveyardTokens: false,

    deck: [],
    phase: phases[0],
    phaseIdx: 0,
    graveyard: [],
    exile: [],
    hand: []
  },
  mutations: {
    setDeck(state, newDeck) {
      state.deck = newDeck
    },
    stepPhase(state) {
      const nextPhaseIdx = (state.phaseIdx + 1) % phases.length
      state.phase = phases[nextPhaseIdx];
      console.log(state.phase)
    },
    draw(state) {
      console.log("Deck", state.deck.length)
      let card
      do {
        card = state.deck.shift()
        state.hand.push(card)
      } while (card.isToken());
    }
  },
  actions: {
    setDeck(context, newDeck) {
      context.commit('setDeck', newDeck)
    },
    stepPhase(context) {
      context.commit('stepPhase')

      if (context.state.phase.id === 'HORDE_DRAW') {
        context.commit('draw')
      }
    }
  },
  modules: {
  }
})
