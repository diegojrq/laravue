<template>
  
</template>

<script>

import { getUsuario, createUsuario, updateUsuario } from '@/services/usuarios.service';
import { getRoles } from '@/services/roles.service';
import { getLocalizacoes } from '@/services/localizacoes.service';

import { validator } from "@/mixins/validator";
import { handleError } from '@/mixins/handleError';
import { alert } from '@/mixins/alert';
import googleAnalytics from "@/mixins/googleAnalytics"

import moment from 'moment';
moment.locale('pt-br');

export default {

  mixins: [validator, handleError, alert, googleAnalytics],

  data: () => ({

    form: {
      id: null,
      nome: null,
      email: null,
      cpf: null,
      telefone: null,
      status: true,
      role_id: null,
      lotacao_id: null,
    },

    routeView: false,
    routeNew: false,
    usuario: null,
    roles: [],
    lotacoes: [],

  }),

  created() {

    this.routeView = this.$route.name == 'visualizar-usuario' ? true : false;
    this.routeNew = this.$route.name == 'novo-usuario' ? true : false;

    getRoles().then((response) => {
      this.roles = response.data;
    })

    getLocalizacoes().then((response) => {
      this.lotacoes = response.data;
    })

    // visualizar ou editar
    if (this.$route.params.usuario) { 
      getUsuario(this.$route.params.usuario).then((response) => {
        this.usuario = response.data;
        this.form = this.usuario;

        this.form.created_at = this.formatDate(response.data.created_at);
        this.form.updated_at = this.formatDate(response.data.updated_at);
      })
    }

  },
  methods: {

    salvar() {
      
      this.$refs.form.validate().then((response) => {

        if (response.valid) {
          
          let promise;                            
          if (this.$route.params.usuario) {
            promise = updateUsuario(this.$route.params.usuario, this.form)
          } else {
            promise = createUsuario(this.form)
          }

          promise.then(response => {
            
            this.sendAlert('Sucesso!', response.data.success.message, 'success')
            this.$router.push({ name: 'usuarios' })

          }).catch(error => this.handleError(error))

        }
      });
    },

    formatDate(date) {
      return moment(date).format('DD/MM/YYYY [às] HH:mm:ss');
    },
  }
}

</script>