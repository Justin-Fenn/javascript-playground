<template>
  <div id="app">
    <img id="vue-logo" src="./assets/logo.png">
    <stream></stream>
    <new-message-box></new-message-box>
  </div>
</template>

<script>
import Stream from './components/Stream';
import NewMessageBox from './components/NewMessageBox';

export default {
  name: 'app',
  components: {
    Stream,
    NewMessageBox
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 95vh;
}

#vue-logo {
  height: 10vh;
}

.stream {
  height: 80vh;
}

.new-message-box {
  height: 10vh;

}

html {
  background-color: #EEEEEE;
}
</style>
