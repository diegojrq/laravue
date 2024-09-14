<template>
  <div class="container">
    <v-alert
      v-if="showAlert"
      border="bottom"
      type="warning"
      variant="outlined"
      prominent
    >
      Waiting for logout... Be patient =)
    </v-alert>
    
  </div>
</template>

<script>

import { useAuthStore } from '@/stores/auth';
import { useLoadingStore } from '@/stores/loading'

export default {

  data: () => ({
    showAlert: false,
  }),

  created() {

    const authStore = useAuthStore();

    if (!authStore.isAuthenticated()) {
      this.$router.push({ name: 'index' });
    } else {
      
      authStore.clearAuthData();
      let loadingStore = useLoadingStore()
      loadingStore.showLoading();
      this.showAlert = true;
  
      // Add a timeout before pushing the route
      setTimeout(() => {
        loadingStore.hideLoading();
        this.$router.push({ name: 'index' });
      }, 3000);
    }
  },
};

</script>

<style scoped>

.container {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  display: flex;
  text-align: center;
}

</style>