<template>
  <div class="container">    
    <div class="column">
      <div class="login-form">
        <form @submit.prevent="login" >
          <h2>Login</h2>
          <input type="email" v-model="form.email" placeholder="E-mail" required>
          <input type="password" v-model="form.password" placeholder="Password" required>
          <button type="submit">Login</button>
          <p>Don't have an account? <router-link to="/register">Register</router-link></p>
        </form>
      </diV>
    </div>
    <div class="column">
      <div class="login-content">
        <p>
          <strong>__en</strong>
        </p>
        <br/>
        <p>
          This project serves as a foundational template for my other projects, featuring a <strong>seamless integration of Laravel and Vue.js.</strong> It includes a <strong>basic authentication</strong> system with a login form, registration form, a home page and some other features. Users can log in with their email and password, or register by providing their name, email, and password. After logging in, users are redirected to the home page, where they are greeted with an overview of the project.
        </p>
        <br/>
        <p>
          <strong>__pt-BR</strong>
        </p>
        <br/>
        <p>
          Este projeto serve como um modelo fundamental para meus outros projetos, apresentando uma <strong>integração perfeita entre Laravel e Vue.js.</strong> Inclui um sistema de <strong>autenticação básica</strong> com um formulário de login, um formulário de registro, uma página inicial e algumas outras funcionalidades. Os usuários podem fazer login com seu e-mail e senha ou se registrar fornecendo seu nome, e-mail e senha. Após o login, os usuários são redirecionados para a página inicial, onde são recebidos com uma visão geral do projeto.
        </p>
      </div>
    </div>
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

  created() {
    const authStore = useAuthStore();
    if (authStore.isAuthenticated()) {
      this.$router.push({ name: 'home' });
    }
  },

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
          this.$router.push({ name: 'home' });
        }
      }).catch((error) => {        
        if (error.response.status == 401) {
          this.sendAlert('Authentication failed!', ['Invalid email or password. Check your credentials and try again.'], 'danger');
        }
      });
    },
  },
};

</script>

<style scoped>

.container {
  display: flex;
  flex-wrap: wrap; /* Ensures the layout is responsive */
  margin-top: 16%;  
  width: 80%;
  margin: 12% auto;
}

.column {
  flex: 1; /* Each column takes equal width */  
}

/* Responsive layout for screens narrower than 600px */
@media (max-width: 600px) {
  
  .container {
    flex-direction: column; /* Stacks columns vertically */
    width: 100%;
    margin: 16% auto;
    margin-bottom: 20%;
  }
  
  .column {
    flex-basis: 100%; /* Each column takes full width */
  }
}

.login-content {
  max-width: 92%;
  margin: 1rem auto;
  padding: 1.6rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: justify;
}

.login-form {
  max-width: 92%;
  margin: 1rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login-form h2 {
  color: #333;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
}

.login-form input[type="email"],
.login-form input[type="password"] {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Ensures padding does not affect the overall width */
}

.login-form button[type="submit"] {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-form button[type="submit"]:hover {
  background-color: #0056b3;
}

.login-form p {
  text-align: center;
  margin-top: 1rem;
}

.login-form p a {
  color: #007bff;
  text-decoration: none;
}

.login-form p a:hover {
  text-decoration: underline;
}


</style>