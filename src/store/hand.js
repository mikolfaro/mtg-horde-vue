export default {
  state: () => ({ cards: [] }),
  mutations: {
    clearHand(state) {
      state.cards = []
    },
    removeFromHand(state, card) {
      state.cards = state.cards.filter(function (aCard) {
        return card.index !== aCard.index
      })
    }
  }
}
