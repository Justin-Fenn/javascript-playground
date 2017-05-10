<template>
  <div class="new-message-box">
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
  height: 100%;
}

textarea {
  height: 100%;
  width: 60%;
  padding: 12px 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
}

@media only screen and (min-width: 900px) {
  .stream {
    width: 762px;
    margin: auto;
  }

}

</style>