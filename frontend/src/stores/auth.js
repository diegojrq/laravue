// @ts-check
import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',

  actions: {
    setCodeVerifier(codeVerifier) {
      localStorage.setItem('LaraVueCodeVerifier', codeVerifier);
    },

    getCodeVerifier() {
      return localStorage.getItem('LaraVueCodeVerifier');
    },

    setAuthData(authData) {
      localStorage.setItem('LaraVueAuthData', JSON.stringify(authData));
    },

    getAuthData() {
      return JSON.parse(localStorage.getItem('LaraVueAuthData'));
    },

    clearAuthData() {
      localStorage.removeItem('LaraVueAuthData');
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
