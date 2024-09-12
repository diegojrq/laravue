<template>
  <div class="login-container">
    <form @submit.prevent="login" class="login-form">
      <h2>Login</h2>
      <input type="email" v-model="form.email" placeholder="E-mail" required>
      <input type="password" v-model="form.password" placeholder="Password" required>
      <button type="submit">Login</button>
      <p>Don't have an account? <router-link to="/register">Register</router-link></p>
    </form>
  </div>
</template>

<script>

import { login } from '@/services/auth.service';
import { handleError } from '@/mixins/handleError';
import { alert } from '@/mixins/alert';
import { useAuthStore } from '@/stores/auth';

export default {

  mixins: [handleError, alert],
  
  data: () => ({

    form: {
      email: '',
      password: '',
    },
  }),

  methods: {

    login() {
      login(this.form).then((response) => {
        if (response.status = 200) {          

          const authStore = useAuthStore();
          let authData = {
            user: response.data.data.user,
            token: response.data.data.token,
          }

          authStore.setAuthData(authData);

          this.sendAlert('Bem vindo, meu nobre!', '', 'success')
          this.$router.push({ name: 'home' });
        }
      }).catch((error) => {        
        if (error.response.status == 401) {
          this.sendAlert('Erro na autenticação!', 'E-mail e/ou senha incorretos. Verifique suas credenciais e tente novamente.', 'warning')
        }
      });
    },
  },
};

</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-form {
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}

.login-form h2 {
  text-align: center;
  color: #333;
}

.login-form input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-form button:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .login-form {
    width: 90%;
    margin: 0 auto;
  }
}
</style>