<template>
  <div class="first-container">
    <div class="column">
      <div class="black-box-content">
        <h4>
          <strong>__en</strong>
        </h4>
        <br/>
        <p>
          Hi, there! I'm Diego Queiroz, a full-stack developer with a passion for creating innovative and user-friendly applications. Currently working as a <strong>senior developer specialized on Laravel and Vue.</strong>
        </p>
        <br/>
        <p>
          This always-evolving project is a basic showcase of my skills and a foundation for my future projects.
        </p>
        <br/>
        <p>
          Feel free to explore the features and technologies used in this project. If you have any questions or feedback, please don't hesitate to reach out.
        </p>
        <br/>
        <h4>
          <strong>__pt-BR</strong>
        </h4>
        <br/>
        <p>
          Olá! Eu sou Diego Queiroz, um desenvolvedor full-stack com paixão por criar aplicativos inovadores e fáceis de usar. Atualmente trabalhando como <strong>desenvolvedor sênior especializado em Laravel e Vue.</strong>
        </p>
        <br/>
        <p>
          Este projeto em constante evolução é uma vitrine básica das minhas habilidades e uma base para meus futuros projetos.
        </p>
        <br/>
        <p>
          Sinta-se à vontade para explorar as funcionalidades e tecnologias utilizadas neste projeto. Se tiver alguma dúvida ou feedback, não hesite em entrar em contato.
        </p>
      </div>
    </div>        
  </div>  
  <div class="second-container">
    <div class="column">
      <div class="box-content">
        <p>
          <strong>__frontend stack</strong>
        </p>
        <br/>
        <ul class="stack-list">
          <li><strong>Vue 3</strong></li>
          <li><strong>Vuetify</strong> for beautiful UI components.</li>
          <li><strong>Vuelidate</strong> for form validations.</li>
          <li><strong>Axios</strong> for HTTP requests.</li>
          <li><strong>Pinia</strong> for state management.</li>
          <li><strong>Vue Router</strong> for routing.</li>
          <li><strong>Vue moment</strong> for date formatting.</li>
        </ul>
      </div>
    </div>
    <div class="column">
      <div class="black-box-content">
        <p>
          <strong>__backend stack</strong>
        </p>
        <br/>
        <ul class="stack-list">
          <li><strong>Laravel 11</strong></li>
          <li><strong>Laravel Passport</strong> for authentication management using OAut2.</li>
          <li><strong>RESTful API</strong> architecture.</li>
          <li><strong>PostgreSQL</strong> database.</li>
          <li><strong>Form Request</strong> for nice validations.</li>
          <li><strong>Services</strong> for business logic.</li>
        </ul>
      </div>
    </div>    
    <div class="column">
      <div class="box-content">
        <p>
          <strong>__features</strong>
        </p>
        <br/>
          <ul class="stack-list">
            <li><strong>__login:</strong> Secure and user-friendly login process, ensuring that access to user accounts is both seamless and protected.</li>
            <li><strong>__register:</strong> An intuitive registration flow, making it easy for new users to join. Lacks some features as password recovery and e-mail confirmation.</li>
            <li><strong>__logout:</strong> Users can safely log out, ensuring their account security is upheld. You can touch the navigation menu icon to open the drawer and click on the logout button.</li>
            <li><strong>__home:</strong> The home page serves as the central hub of our application, offering users an informative starting point for their navigation.</li>
            <li><strong>__users:</strong> A dedicated section for user management, allowing for the viewing and editing of user profiles. You can access this feature <router-link to="/admin/users">here</router-link> or trhough the navigation menu.</li>
          </ul> 
      </div>
    </div>
    <div class="column">
      <div class="black-box-content">
        <p>
          <strong>__upcoming features</strong>
        </p>
        <br/>
          <ul class="stack-list">
            <li><strong>__tests:</strong> Comprehensive testing across all functionalities to ensure reliability and stability.</li>
            <li><strong>__internationalization:</strong> Suppport for multiple languages, allowing users to select their preferred language.</li>
            <li><strong>__dockerization:</strong> Leveraging Docker to streamline deployment processes, ensuring our application can be easily set up and scaled across any environment.</li>
            <li><strong>__swagger:</strong> Integrating Swagger for API documentation, making it easier for developers to understand and work with our application's APIs.</li>
            <li><strong>__password recovery:</strong> Secure and user-friendly password recovery feature, ensuring users can regain access to their accounts effortlessly.</li>
            <li><strong>__e-mail confirmation:</strong> Enhancing security and user verification through e-mail confirmation during the registration process.</li>
            <li><strong>__roles and authorization:</strong> Robust roles and authorization system, allowing for granular access control and enhanced security.</li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>

import { useAuthStore } from '@/stores/auth';

export default {

  data: () => ({
    users: [],
    user_name: '',
    user_email: '',
  }),

  

  methods: {
    handleLogoutClick() {
      this.$router.push({ name: 'logout' });
    },
  },
};

</script>

<style scoped>

.first-container {
  display: flex;
  flex-wrap: wrap; /* Ensures the layout is responsive */
  width: 98%;  
  margin: 0 auto;
  margin-top: 6%;  
}

.second-container {
  display: flex;
  flex-wrap: wrap; /* Ensures the layout is responsive */
  width: 92%;
  margin: 0 auto;
  margin-bottom: 8%;
}

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
  
  .first-container {
    flex-direction: column; /* Stacks columns vertically */
    width: 100%;
    margin: 16% auto;
    margin-bottom: 2%; 
  }

  .second-container {
    flex-direction: column; /* Stacks columns vertically */
    width: 100%;
    margin-bottom: 20%; 
  }

  .container {
    flex-direction: column; /* Stacks columns vertically */
    width: 100%;
    margin: 16% auto;    
  }
  
  .column {
    flex-basis: 100%; /* Each column takes full width */
  }
}

.box-content {
  max-width: 92%;
  margin: 1rem auto;
  padding: 1.6rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: justify;
}

.box-content p{  
  margin: -5px;
}

.box-content .stack-list {  
  padding-left: 10px;
  list-style-type: none; /* Removes default bullet points */
}

.box-content .stack-list li {
  font-size: 0.9em;
  margin-bottom: 10px; /* Adds space between list items */
  padding: 10px;
  background-color: #f0f0f0; /* Light grey background */
  border-radius: 5px; /* Rounded corners */
  transition: background-color 0.3s ease; /* Smooth background color change on hover */
}

.box-content .stack-list li:hover {
  background-color: #e2e2e2; /* Slightly darker grey on hover */
}

.black-box-content {
  max-width: 92%;
  margin: 1rem auto;
  padding: 1.6rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: justify;
  background-color: #333;
  color: #fff;
}

.black-box-content p{    
  margin: -8px 0 -8px 0;
}

.black-box-content .stack-list {  
  padding-left: 10px;
  list-style-type: none; /* Removes default bullet points */
}

.black-box-content .stack-list li {
  font-size: 0.9em;
  margin-bottom: 10px; /* Adds space between list items */
  padding: 10px;
  background-color: #fff; /* Light grey background */
  border-radius: 5px; /* Rounded corners */
  transition: background-color 0.3s ease; /* Smooth background color change on hover */
  color: #000;
}

.black-box-content .stack-list li:hover {
  background-color: #e2e2e2; /* Slightly darker grey on hover */
}



</style>
