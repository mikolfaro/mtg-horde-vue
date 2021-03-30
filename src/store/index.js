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
    untap(state) {
      state.board = state.board.map((card) => {
        if (card.tapped) {
          return card.set('tapped', false)
        }

        return card
      })
    },
    play(state) {
      state.hand.forEach((card) => {
        if (card.isPermanent()) {
          state.board.push(card)
        } else {
          console.log("Casting spell", card.name())
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
    },
    resolveSpell(context, spell) {
      context.commit('resolveSpell', spell)
    },
    counterSpell(context, spell) {
      context.commit('counterSpell', spell)
    }
  },
  modules: {
  }
})
