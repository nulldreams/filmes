import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      counter: 0,
      filmeAtual: {}
    },
    mutations: {
      increment (state, teste) {
        console.log(teste)
        state.counter++
      },
      atualizarFilme (state, filme) {
        state.filmeAtual = filme
        console.log('filme', state.filmeAtual)
      }
    }
  })
}

export default createStore