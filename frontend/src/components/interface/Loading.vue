<template>

  <div v-if="currentLoading" class="loading-fixed-div">
    <Loading :active="currentLoading" :is-full-page="true" :color="'#3498db'" :loader="'bars'" :width="64" :height="64" />
  </div>

</template>

<script>

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import { defineComponent, watch, ref } from 'vue'
import { useLoadingStore } from '@/stores/loading'

export default defineComponent({
  id: 'loading',

  components: {
    Loading,
  },

  setup() {
    const loadingStore = useLoadingStore()
    const currentLoading = ref (null)

    watch(
      () => loadingStore.loading,
      () => {
        currentLoading.value = loadingStore.loading
      },
      { immediate: true }
    )

    return {
      currentLoading,
    }
  },
})
</script>

<style scoped>

.loading-fixed-div {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(128, 128, 128, 0.5); /* Grey background with opacity */
  z-index: 9999; /* Keep on top */
  display: flex;
  justify-content: center;
  align-items: center;  
}

</style>