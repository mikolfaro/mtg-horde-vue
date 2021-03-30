import Vue from 'vue'
import Vuex from 'vuex'
import { phases } from '@/helpers'

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
    effects: []
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
    untap(state) {
      state.board = state.board.map((card) => {
        if (card.tapped) {
          return card.set('tapped', false)
        }

        return card
      })
    },
    play(state) {
      state.board.forEach((card) => {
        if (card.isPermanent()) {
          state.board.push(card)
        } else {
          state.effects.push(card)
        }
      })

      state.hand = []
    },
    attack(state) {
      state.board = state.board.map((card) => {
        if (!card.tapped && card.isCreature()) {
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
        context.commit('untap')
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