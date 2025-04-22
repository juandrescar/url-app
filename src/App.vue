<template>
  <v-app>
    <NavBar :auth="auth" />
    <v-main>
      <router-view @login-success="auth = true" />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import { ref, provide } from 'vue'
  import NavBar from './components/NavBar.vue';

  const auth = ref(!!localStorage.getItem('auth_token'))
  provide('auth', auth)
</script>
