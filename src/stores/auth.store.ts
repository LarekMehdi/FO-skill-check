import { defineStore } from 'pinia'
import type { UserInterface } from '../interfaces/user.interface';
import type { AuthDataInterface } from '../interfaces/auth.interface';

export const useAuthStore = defineStore('auth', {
  state() {
    return {
      accessToken: '',
      refreshToken: '',
      user: null as null | UserInterface,
    }
  },
  actions: {
    setAuthState(authData: AuthDataInterface) {
      this.accessToken = authData.accessToken;
      this.refreshToken = authData.refreshToken || '';
      this.user = authData.user;
    },
    clearAuth() {
      this.accessToken = '';
      this.refreshToken = '';
      this.user = null;
    }
  },
  persist: true,
})