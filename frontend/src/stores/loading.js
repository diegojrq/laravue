// @ts-check
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore({
  id: 'loading',

  state: () => ({
    loading: false,
  }),

  actions: {
    showLoading() {
      this.loading = true;
    },

    hideLoading() {
      this.loading = false;
    }
  },
})
