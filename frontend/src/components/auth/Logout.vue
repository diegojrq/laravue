<template>
  logout
</template>

<script>

import { useAuthStore } from '@/stores/auth';
import { useLoadingStore } from '@/stores/loading'

export default {

  data: () => ({

  }),

  created() {
    let loadingStore = useLoadingStore()
    loadingStore.showLoading();
    
    const authStore = useAuthStore();
    authStore.clearAuthData();

    // Add a timeout before pushing the route
    setTimeout(() => {
      loadingStore.hideLoading();
      this.$router.push({ name: 'login' });
    }, 3000);
  },
};

</script>

<style scoped>
</style>