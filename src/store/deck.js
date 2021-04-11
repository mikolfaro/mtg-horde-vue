export default {
  state: () => ({ cards: [] }),
  mutations: {
    setDeck(state, newDeck) {
      state.cards = newDeck
    },
    removeFromDeck(state, card) {
      state.cards = state.cards.filter(function (aCard) {
        return card.index !== aCard.index
      })
    }
  },
  actions: {
    setDeck({ commit }, newDeck) {
      commit('setDeck', newDeck)
    },
    millDeck(context, count) {
      context.commit('millDeck', count)
    },
  }
}
