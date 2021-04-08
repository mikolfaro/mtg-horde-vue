import Vue from 'vue'
import Vuex from 'vuex'
import board from './board'
import deck from './deck'
import hand from './hand'
import phases from './phases'
import settings from './settings'
import Card from '@/models/Card'
import { preload } from '../helpers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cardNextId: 200,
  },
  mutations: {
    incCardId(state) {
      state.cardNextId += 1
    },
    drawToCard(state) {
      let card
      do {
        card = state.deck.cards.shift()
        state.hand.cards.push(card)
      } while (card.isToken());
    },
    drawCards(state, count) {
      for(let i = 0; i < count; i++) {
        state.hand.cards.push(state.deck.cards.shift())
      }
    },
    discardCard(state) {
      if (!state.hand.cards) {
          return
      }

      const cardIdx = Math.floor(Math.random() * state.hand.cards.length)
      const discardedCards = state.hand.cards.splice(cardIdx, 1)
      discardedCards.map((card) => {
        if (!state.settings.graveyardTokens && card.isToken()) {
          state.board.exile.push(card)
        } else {
          state.board.graveyard.push(card)
        }
      })
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
    },
    setSpawnableToken(state, cardData) {
      state.spawnableToken = cardData
    },
    spawnCard(state, card) {
      state.board.permanents.push(card)
    }
  },
  actions: {
    resetGame({commit}, [deck, spawnableToken]) {
      commit('setDeck', deck)
      commit('setSpawnableToken', spawnableToken)
      commit('clearBoard')
      commit('clearHand')
      commit('resetPhase')
    },
    stepPhase({ commit, state }) {
      commit('stepPhase')

      if (state.phases.current.id === 'HORDE_DRAW') {
        commit('drawToCard')
        commit('untapAll')

        state.deck.cards.slice(0, 5).forEach((card) => {
          preload(card.cardData.imageUrl)
        })
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
    newCardId({ commit, state }) {
      commit('incCardId')
      return state.cardNextId
    },
    spawnToken({ commit, dispatch, state }, stats) {
      const card = Card.createFromCardData(Object.assign({}, state.spawnableToken, {
        "power": stats.power.toString(),
        "toughness": stats.toughness.toString(),
      }), dispatch('newCardId'))

      commit('spawnCard', card)
    },
    draw({ commit }) {
      commit('drawCards', 1)
    },
    discard({ commit }) {
      commit('discardCard')
    }
  },
  modules: {
    board,
    deck,
    hand,
    settings,
    phases,
  }
})
