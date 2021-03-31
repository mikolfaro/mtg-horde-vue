export default {
  state: () => ({
    permanents: [],
    graveyard: [],
    stack: [],
    exile: [],
 }),
  mutations: {
    attack(state) {
      state.permanents = state.permanents.map((card) => {
        if (!card.tapped && card.isCreature()) {
          return card.tap()
        }

        return card
      })
    },
    untapAll(state) {
      state.permanents = state.permanents.map(card => card.untap())
    },
    untapPermanent(state, permanent) {
      state.permanents = state.permanents.map((card) => {
        if (card.index === permanent.index) {
          return card.untap()
        }

        return card
      })
    },
    tapPermanent(state, permanent) {
      state.permanents = state.permanents.map((card) => {
        if (card.index === permanent.index) {
          return card.tap()
        }

        return card
      })
    },
    resolveSpell(state, spell) {
      if (spell.isPermanent()) {
        state.permanents.push(spell)
      } else {
        state.graveyard.push(spell)
      }
      state.stack.shift()
    },
    counterSpell(state, spell) {
      state.graveyard.push(spell)
      state.stack.shift()
    },
  },
  actions: {
    tapPermanent({ commit }, permanent) {
      commit('tapPermanent', permanent)
    },
    untapPermanent({ commit }, permanent) {
      commit('untapPermanent', permanent)
    },
    destroyPermanent({ commit }, permanent) {
      commit('destroyPermanent', permanent)
    }
  }
}
