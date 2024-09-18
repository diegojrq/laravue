<template>
  <div class="container">
    <v-card
      color="#333"      
      title="Users Management"
      subtitle="Refine your search"
      :elevation="2"
    >
      <v-card-item>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
            label="E-mail"
            clearable
            @keyup.enter="filtrar(page, itemsPerPage, sortBy)"
            v-model="filter.email"                            
            :hide-details="true"
            ></v-text-field>
          </v-col>      
          <v-col cols="12" md="8">
            <v-text-field
              label="Name"
              clearable
              @keyup.enter="filtrar(page, itemsPerPage, sortBy)"
              v-model="filter.name"                            
              :hide-details="true"              
            ></v-text-field>
          </v-col>        
        </v-row>
      </v-card-item>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="mr-2"
          color="error"
          variant="flat"
          prepend-icon="mdi-filter-remove-outline"          
          @click="limparFilter()"
        >
          Clear
        </v-btn>        
        <v-btn
          class="mr-2"
          color="primary"
          prepend-icon="mdi-filter"
          variant="flat"
          @click="filtrar(page, itemsPerPage, sortBy)"
        >
          Filter
        </v-btn>
      </v-card-actions>
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
            <v-list-item v-for="(item, index) in feature_list" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expansion-panel-text>          
      </v-expansion-panel>
    </v-expansion-panels>

    <v-data-table-server
      v-model:items-per-page="itemsPerPage"      
      :headers="headers"
      :items-length="totalItems"
      :items="users"
      :loading="loading"
      loading-text="Loading..."
      no-data-text="No data available =\"
      items-per-page-text="Items per page:"
      @update:options="filtrar"
    >
      <template v-slot:item.actions="{ item }">

        <v-tooltip            
          location="top"
          text="View"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              class="mr-1"
              v-bind="props"
              density="comfortable"
              icon="mdi-magnify"
              color="primary"
              :to="{ name: 'view-user', params: { user: item.id } }"
            />
          </template>
        </v-tooltip>

      </template>

    </v-data-table-server>
  </div>
</template>

<script>

import { getUsersPaginate } from '@/services/user.service';

export default {

  mixins: [],

  data: () => ({
    filter: {
      name: null,
      email: null,
    },

    feature_list: [
      { title: 'Pagination', subtitle: 'Using pagination to display the users. See backend code for more details.' },
      { title: 'Users', subtitle: 'Users are created through the factory ( --seed ) and the register/login feature.' },
      { title: 'Search', subtitle: 'Approximated search by name and email. See backend code for more details.' },
      { title: 'Add', subtitle: 'You can\'t add users here because after the seeder runs, it can only be created through the register/login feature.' },
    ],

    itemsPerPage: 10,
    page: 1,
    sortBy: ['id'],
    headers: [
      { title: 'ID', key: 'id', align: 'end' },
      { title: 'E-mail', key: 'email', align: 'start' },   
      { title: 'Name', key: 'name', align: 'start' },
      { title: 'Actions', key: 'actions', align: 'end', sortable: false },
    ],

    users: [],
    loading: true,
    totalItems: 0,
  }),

  methods: {

    filtrar({page, itemsPerPage, sortBy}) {

      this.loading = true;

      itemsPerPage ? this.itemsPerPage = itemsPerPage : itemsPerPage;
      page ? this.page = page : page;
      sortBy ? this.sortBy = sortBy : sortBy;

      getUsersPaginate(this.page, this.itemsPerPage, this.sortBy, this.filter).then((response) => {
        this.loading = false;
        this.users = response.data.data;
        this.totalItems = response.data.total;
      });
    },

    limparFilter() {

      this.filter = {
        name: null,
        email: null,
      };

      this.filtrar(this.page, this.itemsPerPage, this.sortBy);
    },

    deleteItem(item) {
      if (confirm('Do you really want to delete this item?')) {
        
        let promise = deleteUsuario(item.id);

        promise.then(response => {
          
          this.sendAlert('Success!', response.data.success.message, 'success')
          this.filtrar(this.page, this.itemsPerPage, this.sortBy);          

        }).catch(error => this.handleError(error))
      }
    }
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