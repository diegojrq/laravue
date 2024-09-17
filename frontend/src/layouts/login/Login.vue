<template>
  <v-app>
    <Header />
    <Alert />
    <Loading />
    <View />
    <Footer />
  </v-app>
</template>

<script setup>

import Header from '@/layouts/login/Header.vue'
import Alert from '@/components/interface/Alert.vue'
import Loading from '@/components/interface/Loading.vue'
import View from '@/layouts/login/View.vue'
import Footer from '@/layouts/login/Footer.vue'

</script>
