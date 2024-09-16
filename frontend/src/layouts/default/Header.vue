<template>
  <header>
    <v-app-bar
      color="#333"
      
    >
      <v-app-bar-nav-icon v-if="$vuetify.display.mobile" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        LaraVue
      </v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'bottom' : undefined"
      expand-on-hover
      rail
    >
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          :subtitle=this.user_email
          :title=this.user_name
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-home" title="Home" value="home"
          @click="() => $router.push({ name: 'home' })"
        ></v-list-item>
        <v-list-item prepend-icon="mdi-account-multiple" title="Users" value="users"
          @click="() => $router.push({ name: 'users' })"
        ></v-list-item>
        <v-list-item prepend-icon="mdi-logout" title="Logout" value="logout"
          @click="() => $router.push({ name: 'logout' })"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script>

import { useAuthStore } from '@/stores/auth';

export default {

  data: () => ({
    drawer: true,
    items: [
      { title: 'Home', icon: 'mdi-home', link: '/' },
      { title: 'Login', icon: 'mdi-login', link: '/login' },
      { title: 'Register', icon: 'mdi-account-plus', link: '/register' },
      { title: 'Logout', icon: 'mdi-logout', link: '/logout' },
    ],
  }),

  created() {
    const authStore = useAuthStore();
    this.user_name = authStore.getAuthData().name;
    this.user_email = authStore.getAuthData().email;
  },
};

</script>