<template>
  <div class="container">    
    <div class="column">
      <div class="register-content">
        <p>
          <strong>__en</strong>
        </p>
        <br/>
        <p>
          This application leverages <strong>Laravel Passport</strong> to handle authentication and secure access to its APIs. Laravel Passport is a powerful package designed to simplify the implementation of <strong>OAuth2</strong>, a widely used authorization framework.
        </p>
        <br/>
        <p>
          <strong>__pt-BR</strong>
        </p>
        <br/>
        <p>
          Este aplicativo utiliza o <strong>Laravel Passport</strong> para gerenciar a autenticação e garantir o acesso seguro às suas APIs. O Laravel Passport é um pacote poderoso projetado para simplificar a implementação do <strong>OAuth2</strong>, um framework de autorização amplamente utilizado.
        </p>
      </div>
    </div>
    <div class="column">
      <div class="register-form">
      <form @submit.prevent="register" >
        <h2>Register</h2>        
        <input type="text" v-model="form.name" placeholder="Name" required
          :class="v$.form.name.$error ? 'input input-danger' : 'input'" @blur="v$.form.name.$touch">
        <p v-for="error in v$.form.name.$errors" class="flash-message">{{ error.$message }}</p>
        <input type="email" v-model="form.email" placeholder="Email" required
          :class="v$.form.email.$error ? 'input input-danger' : 'input'" @blur="v$.form.email.$touch">
        <p v-for="error in v$.form.email.$errors" class="flash-message">{{ error.$message }}</p>
        <input type="password" v-model="form.password" placeholder="Password" required
          :class="v$.form.password.$error ? 'input input-danger' : 'input'" @blur="v$.form.password.$touch">
        <p v-for="error in v$.form.password.$errors" class="flash-message">{{ error.$message }}</p>
        <input type="password" v-model="form.password_confirmation" placeholder="Confirm Password" required
          :class="v$.form.password_confirmation.$error ? 'input input-danger' : 'input'" @blur="v$.form.password_confirmation.$touch">
        <p v-for="error in v$.form.password_confirmation.$errors" class="flash-message">{{ error.$message }}</p>
        <button type="submit">Register</button>
      </form>
    </diV>
    </div>
  </div>
</template>

<script>

import { register } from '@/services/auth.service';
import { handleError } from '@/mixins/handleError';
import { alert } from '@/mixins/alert';
import { useAuthStore } from '@/stores/auth';
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators'

export default {

  mixins: [handleError, alert],

  setup() {
      const v$ = useVuelidate();
      return { v$ };
  },
  
  data: () => ({
    form: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  }),

  // definição das regras de validação
  validations() {
    return {
      form: {
        name: {
          required: helpers.withMessage('The Name field is required', required),
          minLength: helpers.withMessage('The Name field must have at least 3 characters', minLength(3)),
          maxLength: helpers.withMessage('The Name field must have a maximum of 255 characters', maxLength(255))
        },
        email: {
          required: helpers.withMessage('The Email field is required', required),
          email: helpers.withMessage('The Email field must be a valid email', email)
        },
        password: {
          required: helpers.withMessage('The Password field is required', required),
          minLength: helpers.withMessage('The Password field must have at least 8 characters', minLength(8)),
          maxLength: helpers.withMessage('The Password field must have a maximum of 255 characters', maxLength(255))
        },
        password_confirmation: {
          required: helpers.withMessage('The Confirm Password field is required', required),
          sameAs: helpers.withMessage('The Confirm Password field must be the same as the Password field', function(value) {
              return value == this.form.password;
          })
        }
     }
   }
  },

  methods: {

    register() {

      this.v$.$touch();

      if (!this.v$.$invalid) {
        
        register(this.form).then((response) => {

          if (response.status = 200) {  

          const authStore = useAuthStore();
          let authData = {
            name: response.data.data.name,
            email: response.data.data.email,
            token: response.data.data.token,
          }

          authStore.setAuthData(authData);
          
          this.$router.push({ name: 'home' });
        
        }}).catch((error) => {
          
          let messages = [];
          console.log(error);
          //this.sendAlert('Errors in the form submission', error.response.data.errors, 'danger');
          Object.keys(error.response.data.errors).forEach((key) => {
            error.response.data.errors[key].forEach((errorMessage) => {
              console.log(errorMessage);
              messages.push(errorMessage);
            });
          });

          this.sendAlert('Errors found on registration!', messages, 'danger');
          
        });

      } else {
        this.sendAlert('Validation error!', ['Please check the form for errors and submit it again.'], 'danger');
        return;
      }
    },
  },
};

</script>

<style scoped>

.container {
  display: flex;
  flex-wrap: wrap; /* Ensures the layout is responsive */
  margin-top: 16%;  
}

.column {
  flex: 1; /* Each column takes equal width */  
}

/* Responsive layout for screens narrower than 600px */
@media (max-width: 600px) {
  
  .container {
    flex-direction: column; /* Stacks columns vertically */
    margin-bottom: 20%;
  }
  
  .column {
    flex-basis: 100%; /* Each column takes full width */
  }
}

.register-content {
  max-width: 92%;
  margin: 1rem auto;
  padding: 1.6rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: justify;
}

.register-form {
  max-width: 92%;
  margin: 1rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.register-form h2 {
  color: #333;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
}

.register-form input[type="email"],
.register-form input[type="text"],
.register-form input[type="password"] {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Ensures padding does not affect the overall width */
}

.register-form button[type="submit"] {
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

.register-form button[type="submit"]:hover {
  background-color: #0056b3;
}

.register-form p {
  text-align: left;
  margin-top: -0.6rem;
  color: red;
  font-weight: bold;
  font-size: 0.9em;
}

.register-form p a {
  color: #007bff;
  text-decoration: none;
}

.register-form p a:hover {
  text-decoration: underline;
}


</style>