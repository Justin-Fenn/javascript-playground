<template>
  <div class="user-list">
    <ul>
      <li v-for="user in users">
        <svg height="20" width="20">
          <circle cx="10" cy="10" r="10" stroke-width="3" :fill="user.connected ? 'green' : 'red'" />
        </svg>
        <img :src="'https://robohash.org/'+user.id" alt="Robohash Avatar">     
        <span>{{user.id.substring(0,12)}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "user-list",
  computed: {
    users() {
      return this.$store.getters.users.sort((a,b)=>b.connected-a.connected);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-list {
  overflow-y: auto;
  padding-right: 2%;
  padding-left: 1%;
  background-color: white;
}

ul {
  list-style-type: none;
  padding: 0;
  margin-top:0;
}

img {
  height: 50px;
  border-radius: 50%;
}
</style>