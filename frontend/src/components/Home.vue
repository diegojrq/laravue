<template>
  <div class="container">
    <h1>Home</h1>
    <button @click="() => $router.push({ name: 'users' })">Get Users</button>
    <button @click="handleLogoutClick">lOGOUT</button>  
  </div>
  <h1>Home</h1>
  
  back
  form request
  passport auth
  services

  
  front
  vuetify
  vuelidate
  axios
  pinia
  router
  <button @click="() => $router.push({ name: 'logout' })">Get Users</button>  
</template>

<script>



export default {

  data: () => ({
    users: [],
  }),

  methods: {
    handleLogoutClick() {
      this.$router.push({ name: 'logout' });
    },
  },
};

</script>

<style scoped>

.container {
  margin-top: 100px;
}

</style>
