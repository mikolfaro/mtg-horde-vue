import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    deck: [],
    playersCount: 0,
    graveyardTokens: false,
  },
  mutations: {
    setDeck(state, newDeck) {
      state.deck = newDeck
    }
  },
  actions: {
    setDeck(context, newDeck) {
      context.commit('setDeck', newDeck)
    }
  },
  modules: {
  }
})
