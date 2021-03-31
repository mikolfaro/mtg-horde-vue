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
    stack: []
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
    untapAll(state) {
      state.board = state.board.map((card) => {
        if (card.tapped) {
          return card.set('tapped', false)
        }

        return card
      })
    },
    play(state) {
      state.hand.forEach((card) => {
        if (card.isToken()) {
          state.board.push(card)
        } else {
          state.stack.push(card)
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
    },
    resolveSpell(state, spell) {
      if (spell.isPermanent()) {
        state.board.push(spell)
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
      const milledCards = state.deck.slice(0, count)
      state.graveyard = state.graveyard.concat(milledCards)
      state.deck = state.deck.slice(count)
    },
    // tapPermanent(state, permanent) {
    // },
    // untapPermanent(state, permanent) {
    // },
    destroyPermanent(state, permanent) {
      state.board = state.board.filter(card => card.index !== permanent.index)
      if (!state.graveyardTokens && permanent.isToken()) {
        state.exile.push(permanent)
      } else {
        state.graveyard.push(permanent)
      }

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
    millDeck(context, count) {
      console.log('mill')
      context.commit('millDeck', count)
    },
    tapPermanent(context, permanent) {
      context.commit('tapPermanent', permanent)
    },
    untapPermanent(context, permanent) {
      context.commit('untapPermanent', permanent)
    },
    destroyPermanent(context, permanent) {
      context.commit('destroyPermanent', permanent)
    }
  },
  modules: {
  }
})
