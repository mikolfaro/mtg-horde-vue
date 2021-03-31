export default {
  state: () => ({
      playersCount: 0,
      graveyardTokens: false,
  }),
  mutations: {
    setGraveyardTokens(state, graveyardTokens) {
      state.graveyardTokens = graveyardTokens
    },
    setPlayersCount(state, playersCount) {
      state.playersCount = playersCount
    },
  },
  actions: {
      setPlayersCount(context, graveyardTokens) {
        context.commit('setGraveyardTokens', graveyardTokens)
      },
      setGraveyardTokens(context, graveyardTokens) {
        context.commit('setGraveyardTokens', graveyardTokens)
      },
  }
}
