import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playersCount: 0,
    graveyardTokens: false,

    deck: [],
    phase: {},
    graveyard: [],
    exile: [],
    hand: []
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
