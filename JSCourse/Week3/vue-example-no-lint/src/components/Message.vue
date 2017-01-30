<template>
  <div class="message" v-on:click="test">
    <img :src="avatar" alt="Robohash Avatar">  
    <div class="message-content">
      <p class="username">{{shortName}}</p>
      <p class="time-posted">{{when}}</p>
      <p class="message-text">{{message}}<p>
    </div>
  </div>  
</template>

<script>
import moment from 'moment';

export default {
  name: 'message',
  props: ['messageIn'],
  data() {
    return {
      from: this.messageIn.from,
      message: this.messageIn.message,
      when: moment(this.messageIn.when).format('MMMM Do, YYYY @h:mm:ss a'),
      avatar: "https://robohash.org/"+this.messageIn.from
      };
  },
  computed: {
    shortName: function(){
      return this.from.substring(0,20);
    }
  },
  methods: {
    test: function(event){
      alert(this.shortName);
    }
  }
};



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.message {
  height: 10vh;
  border: solid lightgray 1px;
  display: flex;
  border-radius: 8px;
  background-color: #FFFFFF;
  justify-content: space-between;
  padding: 15px;
}

img { 
  max-height: 80%;
  max-width: 20%;
  margin-right: 15px;
  /*border: dotted cadetblue 1px;*/
}

.message-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.username {
  margin: 0;
  font-weight: bold;
  font-size: x-large;
  color: #35495E;

}

.username:hover {
  color: #41B883;
}

.time-posted {
  margin: 0;
  font-size: 80%;
  color: #D6D5D5;
  text-transform: uppercase;
  letter-spacing: 3px;
}

.message-text {
  font-weight: 400;
}

@media only screen and (min-width: 900px) {
    .user-info {
      max-height: 130px;
    }
}

</style>