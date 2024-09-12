<template>

  usuarios

  <ul>
    <li v-for="user in users">
      {{ user.name }}
    </li>
  </ul>
  <v-data-table-server
        v-model:items-per-page="itemsPerPage"      
        :headers="headers"
        :items-length="totalItems"
        :items="users"
        :loading="loading"
        loading-text="Carregando..."
        no-data-text="Nenhum registro encontrado =\"
        items-per-page-text="Itens por página:"
        @update:options="filtrar"
      >
        
        <template v-slot:item.status="{ item }">
          <v-chip
            v-if="item.status_id === 1"
            small
            outlined
            color="error"
            >
            Aguardando resgate
          </v-chip>
          <v-chip
            v-else
            small
            outlined
            color="success"
          >
            Entregue
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
        
          

        </template>
    
      </v-data-table-server>
  
</template>

<script>

import { getUsers } from '@/services/user.service';

export default {

  mixins: [],

  data: () => ({
    filtro: {
        cpf_trabalhador: null,
        nome: null,
        status_id: 1,
    },

    itemsPerPage: 10,
    page: 1,
    sortBy: ['id'],
    headers: [
      { title: 'ID', key: 'id', align: 'end' },
      { title: 'Nome', key: 'name', align: 'start' },      
      { title: 'Ações', key: 'actions', align: 'end', sortable: false },
    ],

    users: [],
    loading: true,
    totalItems: 0,
  }),

  mounted() {
    
  },

  methods: {

    filtrar({page, itemsPerPage, sortBy}) {

      this.loading = true;

      itemsPerPage ? this.itemsPerPage = itemsPerPage : itemsPerPage;
      page ? this.page = page : page;
      sortBy ? this.sortBy = sortBy : sortBy;

      getUsers().then((response) => {
        this.users = response.data.users;
        this.loading = false;
        this.totalItems = response.data.total;
      });

      /*
      getUsuariosPaginate(this.page, this.itemsPerPage, this.sortBy, this.filtro)
        .then(response => {
          this.loading = false;
          this.usuarios = response.data.data;
          this.totalItems = response.data.total;
        });
        */
    },

    limparFiltro() {

      this.filtro = {
        cpf: null,
        nome: null,
        status: true,
        role_id: null,
      };

      this.filtrar(this.page, this.itemsPerPage, this.sortBy);
    },

    deleteItem(item) {
      if (confirm('Deseja realmente excluir este registro?')) {
        
        let promise = deleteUsuario(item.id);

        promise.then(response => {
          
          this.sendAlert('Sucesso!', response.data.success.message, 'success')
          this.filtrar(this.page, this.itemsPerPage, this.sortBy);          

        }).catch(error => this.handleError(error))
      }
    }
  }
}

</script>