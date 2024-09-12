// @ts-check
import { defineStore } from 'pinia'

export const useAlertStore = defineStore({
  id: 'alert',

  state: () => ({
    alerts: [],
  }),
})
