export default {
  state: () => ({ permanents: [] }),
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
      state.board.cards = state.board.cards.map((card) => {
        if (card.index === permanent.index) {
          return card.tap()
        }

        return card
      })
    },
  },
  actions: {
    tapPermanent(context, permanent) {
      context.commit('tapPermanent', permanent)
    },
    untapPermanent(context, permanent) {
      context.commit('untapPermanent', permanent)
    },
    destroyPermanent(context, permanent) {
      context.commit('destroyPermanent', permanent)
    }
  }
}
