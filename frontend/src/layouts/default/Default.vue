<template>
  <v-app>
    <Alert />
    <Loading />
    <Header />
    <View />
    <Footer />
  </v-app>
</template>

<script setup>

import Header from '@/layouts/Default/Header.vue'
import Alert from '@/components/interface/Alert.vue'
import Loading from '@/components/interface/Loading.vue'
import View from '@/layouts/Default/View.vue'
import Footer from '@/layouts/Default/Footer.vue'

</script>
