import Vue from 'vue';
import Vuex from 'vuex';

import { sampleData } from './data/sampleA';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:8082").io.socket("/rooms/sample");

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    messages: []//sampleData.messages
  },
  getters: {
    messages(state){
      return state.messages;
    }
    //Add users
  },
  mutations: {
    addMessage(state, message) {
      state.messages.push(message);
    }
  },
  actions: {
    getInitialMessages(context){
      // fetch old messages
      fetch("http://localhost:8082/api/rooms/sample")
      .then(res => res.json())
      .then(room => {
          for (let msg of room.messages) context.dispatch('addMessage', msg);
          // subscribe to new messages
          socket.on("new", msg => context.dispatch('addMessage', msg));
      });
    },
    sendMessage(context, messageText){
      socket.emit("send", messageText);
    },
    addMessage(context, message){
      //Do async things here!!
      
      context.commit('addMessage', message);
    }
  }
});