// @ts-check
import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',

  actions: {
    setCodeVerifier(codeVerifier) {
      localStorage.setItem('MyStatsCodeVerifier', codeVerifier);
    },

    getCodeVerifier() {
      return localStorage.getItem('MyStatsCodeVerifier');
    },

    setAuthData(authData) {
      localStorage.setItem('MyStatsAuthData', JSON.stringify(authData));
    },

    getAuthData() {
      return JSON.parse(localStorage.getItem('MyStatsAuthData'));
    },

    clearAuthData() {
      localStorage.removeItem('MyStatsAuthData');
    },

    getUserAccessToken() {
      return !!this.getAuthData() ? this.getAuthData().token.access_token : '';
    },

    getUserRefreshToken() {
      return !!this.getAuthData() ? this.getAuthData().token.refresh_token : '';
    },

    isAuthenticated() {
      return !!this.getAuthData();
    },

    isActive() {
      return this.getAuthData().usuario.status;
    },

    getRole() {
      return this.getAuthData().usuario.role.nome;
    },
  },
})
