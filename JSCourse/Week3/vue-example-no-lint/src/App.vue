<template>
  <div id="app">
    <img id="vue-logo" src="./assets/logo.png">
    <div class="mid-container">
      <user-list></user-list>
      <stream></stream>
    </div>
    <new-message-box></new-message-box>
  </div>
</template>

<script>
import Stream from './components/Stream';
import NewMessageBox from './components/NewMessageBox';
import UserList from './components/UserList';

export default {
  name: 'app',
  components: {
    Stream,
    NewMessageBox,
    UserList
  }
}
</script>

<style>
  
html {
  background-color: #EEEEEE;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#vue-logo {
  height: 10vh;
}

.stream {
  height: 100%;
  width: 70vw;
  border-style: inset;
}

.user-list {
  height: 100%;
  width: 20vw;
  border-style: inset;
}

.new-message-box {
  height: 6vh;
  width: 70vw;
  margin-left: 24vw;
  margin-top: 10px;
}

.mid-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  align-content: flex-start;
  height: 80vh;
}
</style>
