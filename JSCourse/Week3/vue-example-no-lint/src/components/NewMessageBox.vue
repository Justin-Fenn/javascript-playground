<template>
  <div id="new-message-box">
    <!--<input type="text" -->
    <textarea
    placeholder="Enter a new message here..."
    @keyup.enter="sendMessage"
    >
  </div>
</template>

<script>

export default {
  name: 'new-message-box',
  methods: {
    sendMessage: function(event){
      let messageText = event.target.value;
      this.$store.dispatch('sendMessage', messageText);
      event.target.value = "";
    }
  }
}
</script>

<style scoped>

.new-message-box {
  height: 60px;
  /*height: 100%;*/
  width: 10vw;
  border: solid red 1px;
}

textarea {
  height: 100%;
  width: 200px;
  margin: 20px;
  padding: 12px 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
}

</style>