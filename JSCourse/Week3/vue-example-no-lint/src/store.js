import Vue from 'vue';
import Vuex from 'vuex';

import io from 'socket.io-client';

let socket;

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    messages: [],
    users: []
  },
  getters: {
    messages(state){
      return state.messages;
    },
    users(state){
      return state.users;
    },
    filteredUsers(state){
      return state.users.filter(user => user.connected === true);
    }
  },
  mutations: {
    addMessage(state, message) {
      state.messages.push(message); 
    },
    updateUser(state, userIn){
      let user = state.users.find((usr)=>usr.id === userIn.id);
      
      if(user){
        user.connected = user.connected;
      }
      else
      {
        state.users.push(userIn);
      }
    }
  },
  actions: {
    connectRoom(context, room){
      let url = "http://jfenn.ad.dealeron.com:8082/api/rooms/"+room;
      fetch(url, {method: 'put'})
      .then(()=>{
        socket = io.connect("http://jfenn.ad.dealeron.com:8082").io.socket("/rooms/"+room);
        context.dispatch('initializeRoom', url);
      });
    },
    initializeRoom(context, url){
      // fetch old messages
      fetch(url)
      .then(res => res.json())
      .then(room => {

          for (let msg of room.messages) context.dispatch('addMessage', msg);
          // for(let user of room.users) context.dispatch('addUser', user);
          // context.commit('initializeUsers', room.users);
          room.users.forEach(user=>context.commit('updateUser', user));
          console.log(room.users);

          // subscribe to new messages
          socket.on("new", msg => context.dispatch('addMessage', msg));
          socket.on("user_joined", user => context.commit('updateUser', user));
          socket.on("user_disconnected", user => context.commit('updateUser', user));
      });
    },
    initializeUsers(context, users){
      users.forEach(user=>context.commit('updateUser', user));
    },
    sendMessage(context, messageText){
      socket.emit("send", messageText);
    },
    addMessage(context, message){
      //Do async things here
      context.commit('addMessage', message);
    },
    updateUser(context, user){
      context.commit('updateUser', user);
    }
  }
});