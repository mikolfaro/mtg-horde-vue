import Vue from 'vue'
import Vuex from 'vuex'
import board from './board'
import deck from './deck'
import hand from './hand'
import phases from './phases'
import settings from './settings'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {
    draw(state) {
      let card
      do {
        card = state.deck.cards.shift()
        state.hand.cards.push(card)
      } while (card.isToken());
    },
    play(state) {
      state.hand.cards.forEach((card) => {
        if (card.isToken()) {
          state.board.permanents.push(card)
        } else {
          state.board.stack.push(card)
        }
      })

      state.hand.cards = []
    },
    millDeck(state, count) {
      const milledCards = state.deck.cards.slice(0, count)
      milledCards.map((card) => {
        if (!state.settings.graveyardTokens && card.isToken()) {
          state.board.exile.push(card)
        } else {
          state.board.graveyard.push(card)
        }
      })
      state.deck.cards = state.deck.cards.slice(count)
    },
    destroyPermanent(state, permanent) {
      state.board.permanents = state.board.permanents.filter(card => card.index !== permanent.index)
      if (!state.settings.graveyardTokens && permanent.isToken()) {
        state.board.exile.push(permanent)
      } else {
        state.board.graveyard.push(permanent)
      }
    }
  },
  actions: {
    stepPhase({ commit, state }) {
      commit('stepPhase')

      if (state.phases.current.id === 'HORDE_DRAW') {
        commit('draw')
        commit('untapAll')
      } else if (state.phases.current.id === 'HORDE_PLAY') {
        commit('play')
      } else if (state.phases.current.id === 'HORDE_ATTACK') {
        commit('attack')
      }
    },
    resolveSpell({ commit }, spell) {
      commit('resolveSpell', spell)
    },
    counterSpell({ commit }, spell) {
      commit('counterSpell', spell)
    },
  },
  modules: {
    board,
    deck,
    hand,
    settings,
    phases,
  }
})
