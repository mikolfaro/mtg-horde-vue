import Vue from 'vue'
import Vuex from 'vuex'
import board from './board'
import hand from './hand'
import deck from './deck'
import settings from './settings'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    graveyard: [],
    exile: [],
    stack: []
  },
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
          state.stack.push(card)
        }
      })

      state.hand.cards = []
    },
    resolveSpell(state, spell) {
      if (spell.isPermanent()) {
        state.board.permanents.push(spell)
      } else {
        state.graveyard.push(spell)
      }
      state.stack.shift()
    },
    counterSpell(state, spell) {
      state.graveyard.push(spell)
      state.stack.shift()
    },
    millDeck(state, count) {
      const milledCards = state.deck.cards.slice(0, count)
      state.graveyard = state.graveyard.concat(milledCards)
      state.deck.cards = state.deck.cards.slice(count)
    },
    tapPermanent(state, permanent) {
      state.board.cards = state.board.cards.map((card) => {
        if (card.index === permanent.index) {
          return card.tap()
        }

        return card
      })
    },
    destroyPermanent(state, permanent) {
      state.board.permanents = state.board.permanents.filter(card => card.index !== permanent.index)
      if (!state.settings.graveyardTokens && permanent.isToken()) {
        state.exile.push(permanent)
      } else {
        state.graveyard.push(permanent)
      }

    }
  },
  actions: {
    stepPhase(context) {
      context.commit('stepPhase')

      if (context.state.phase.id === 'HORDE_DRAW') {
        context.commit('draw')
        context.commit('untapAll')
      } else if (context.state.phase.id === 'HORDE_PLAY') {
        context.commit('play')
      } else if (context.state.phase.id === 'HORDE_ATTACK') {
        context.commit('attack')
      }
    },
    resolveSpell(context, spell) {
      context.commit('resolveSpell', spell)
    },
    counterSpell(context, spell) {
      context.commit('counterSpell', spell)
    },
  },
  modules: {
    board,
    deck,
    hand,
    settings,
    phase
  }
})
