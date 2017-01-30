<template>
  <div class="stream">
    <div class="container">
      <ul>
        <li v-for="msg in messages">
          <message :message-in="msg" v-scroll-lock></message>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import Message from './Message';

export default {
  name: 'stream',
  components: {
    Message
  },
  computed: {
    messages() {
      return this.$store.getters.messages;
    }
  },
  directives: {
    scrollLock: {
      inserted: function(el){
        let containerElement = document.getElementsByClassName("container")[0];
        containerElement.scrollTop = containerElement.scrollHeight;
      }
    }
  },
  created(){
    this.$store.dispatch('getInitialMessages');
  }
};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stream {
  padding: 0 0px;
  overflow: hidden;
}

.container {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  padding: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 5px;
}

@media only screen and (min-width: 900px) {
  .stream {
    width: 762px;
    margin: auto;
  }

}
</style>
