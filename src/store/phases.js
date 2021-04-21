import { phases } from '@/utils/horde'

export default {
  state: () => ({
    current: phases[0],
    idx: 0
  }),
  mutations: {
    resetPhase(state) {
      state.current = phases[0]
      state.idx = 0
    },
    stepPhase(state) {
      state.idx = (state.idx + 1) % phases.length
      state.current = phases[state.idx];
    },
  },
  actions: {

  }
}
