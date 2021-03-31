import Vue from 'vue'
import Vuex from 'vuex'
import board from './board'
import deck from './deck'
import exile from './exile'
import graveyard from './graveyard'
import hand from './hand'
import phases from './phases'
import settings from './settings'
import stack from './stack'

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
          state.stack.spells.push(card)
        }
      })

      state.hand.cards = []
    },
    resolveSpell(state, spell) {
      if (spell.isPermanent()) {
        state.board.permanents.push(spell)
      } else {
        state.graveyard.cards.push(spell)
      }
      state.stack.spells.shift()
    },
    counterSpell(state, spell) {
      state.graveyard.cards.push(spell)
      state.stack.spells.shift()
    },
    millDeck(state, count) {
      const milledCards = state.deck.cards.slice(0, count)
      state.graveyard.cards = state.graveyard.cards.concat(milledCards)
      state.deck.cards = state.deck.cards.slice(count)
    },
    destroyPermanent(state, permanent) {
      state.board.permanents = state.board.permanents.filter(card => card.index !== permanent.index)
      if (!state.settings.graveyardTokens && permanent.isToken()) {
        state.exile.push(permanent)
      } else {
        state.graveyard.cards.push(permanent)
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
    exile,
    graveyard,
    hand,
    settings,
    phases,
    stack,
  }
})
