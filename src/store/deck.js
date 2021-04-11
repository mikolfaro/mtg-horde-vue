export default {
  state: () => ({ cards: [] }),
  mutations: {
    setDeck(state, newDeck) {
      state.cards = newDeck
    },
    removeFromDeck(state, card) {
      console.log("Remove from deck", card.toString())
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
