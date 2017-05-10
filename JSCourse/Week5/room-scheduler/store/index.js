import Vuex from 'vuex'

export const store = new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    increment (state) {
      state.counter++
    },
    addRoom (state, roomName){
        
    }
  }
})