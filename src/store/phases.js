import { phases } from '@/helpers'

export default {
  state: () => ({
    current: phases[0],
    idx: 0
  }),
  mutations: {
    stepPhase(state) {
      state.idx = (state.idx + 1) % phases.length
      state.current = phases[state.idx];
    },
  },
  actions: {

  }
}
