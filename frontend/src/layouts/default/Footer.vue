<template>
  <footer>
    <div class="footer">
      <v-footer
        class="text-center d-flex flex-column"
        color="#333"
      >
      <div>
          <v-btn
            class="ma-2"            
            icon="mdi mdi-github"
            href="https://www.github.com/diegojrq"
            target="_blank"
          ></v-btn>
          <v-btn
          class="ma-2"            
          icon="mdi mdi-linkedin"
          href="https://www.linkedin.com/in/queirozdiego"
          target="_blank"
          ></v-btn>
          <v-btn
            class="ma-2"            
            icon="mdi mdi-instagram"
            href="https://www.instagram.com/diegojrq"
            target="_blank"
          ></v-btn>
        </div>
      </v-footer>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;  
  color: white;
  text-align: center;  
}

</style>