<template>
  <h1>Home</h1>
  <button @click="() => $router.push({ name: 'users' })">Get Users</button>  
</template>

<script>



export default {

  data: () => ({
    users: [],
  }),
};

</script>
