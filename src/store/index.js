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
    hand: [],
    board: [],
  },
  mutations: {
    setDeck(state, newDeck) {
      state.deck = newDeck
    },
    stepPhase(state) {
      state.phaseIdx = (state.phaseIdx + 1) % phases.length
      state.phase = phases[state.phaseIdx];
    },
    draw(state) {
      let card
      do {
        card = state.deck.shift()
        state.hand.push(card)
      } while (card.isToken());
    },
    play(state) {
      state.board = state.board.concat(state.hand)
      state.hand = []
      console.log(state.board)
    },
    attack(state) {
      state.board = state.board.map((card) => {
        if (!card.tapped) {
          return card.set('tapped', true)
        }

        return card
      })
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
      } else if (context.state.phase.id === 'HORDE_PLAY') {
        context.commit('play')
      } else if (context.state.phase.id === 'HORDE_ATTACK') {
        context.commit('attack')
      }
    }
  },
  modules: {
  }
})
