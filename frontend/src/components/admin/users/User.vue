<template>
  <div class="container">
    <v-card        
      color="#333"      
      title="User"
      subtitle="View"
      :elevation="2"
    >
      <v-card-item>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
              label="E-mail"
              v-model="form.email"
              readonly
              ></v-text-field>
            </v-col>            
            <v-col cols="12" md="8">
              <v-text-field
                label="Name"
                v-model="form.name"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                label="E-mail Verified At"
                v-model="form.email_verified_at"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                label="Created at"
                v-model="form.created_at"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                label="Updated at"
                v-model="form.updated_at"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-item>
    </v-card>
    <v-expansion-panels
      class="mt-4"
    >
      <v-expansion-panel
        rounded        
        >
        <v-expansion-panel-title
          color="#333"
          bg-color="primary"
        >
          <v-icon>mdi-information-outline</v-icon>
          &nbsp;Feature info
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-list dense>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Vue Moment</v-list-item-title>
                <v-list-item-subtitle>For date formatting and manipulation.</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <div class="d-flex my-4">
      <v-spacer></v-spacer>
      <v-btn
        class="mr-2"
        color="error"
        @click="() => $router.go(-1)"
      >
        Voltar
      </v-btn>
    </div>
  </div>  
</template>

<script>

import { getUser } from '@/services/user.service';
import moment from 'moment';
moment.locale('pt-br');

export default {

  data: () => ({

    form: {
      id: null,
      name: null,
      email: null, 
      email_verified_at: null,
      created_at: null,
      updated_at: null,     
    },

    user: null,
  }),

  created() {

    // view
    if (this.$route.params.user) { 
      getUser(this.$route.params.user).then((response) => {
        this.user = response.data.user;
        this.form = this.user;

        this.form.email_verified_at = this.formatDate(response.data.email_verified_at);
        this.form.created_at = this.formatDate(response.data.created_at);
        this.form.updated_at = this.formatDate(response.data.updated_at);
      })
    }

  },
  methods: {

    formatDate(date) {
      return moment(date).format('MM/DD/YYYY [at] HH:mm:ss');
    },
  }
}

</script>

<style scoped>

.container {
  position: relative;
  left: 2%;
  padding: 2%; 
 
  width: 96%;  
  margin: 0 auto;
  margin-top: 6%;  
  margin-bottom: 6%;
}

/* Responsive layout for screens narrower than 600px */
@media (max-width: 600px) {
  
  .container {
    width: 100%;
    padding: 3%; 
    left: 0;
    margin: 16% auto;
    margin-top: 2%; 
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

</style>