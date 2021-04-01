export default {
  state: () => ({ cards: [] }),
  mutations: {
    clearHand(state) {
      state.cards = []
    }
  }
}
