export default {
  state: () => ({ cards: [] }),
  mutations: {
    setDeck(state, newDeck) {
      state.cards = newDeck
    },
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
