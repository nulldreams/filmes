const mutations = {
  increment(state) {
    state.counter++
  },
  filmeAtual(state, filme) {
    state.filmeAtual = filme
  }
}

export default mutations
