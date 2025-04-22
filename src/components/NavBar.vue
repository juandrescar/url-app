<template>
  <v-app-bar app>
    <v-toolbar-title>📊 Stats App</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn-toggle
      v-if="auth"
      borderless
    >
      <v-btn to="/">Dashboard</v-btn>
      <v-btn to="/urls">URLs</v-btn>
      <v-btn class="primary" @click="logout">Logout</v-btn>
    </v-btn-toggle>

    <v-btn-toggle
      v-if="!auth"
      borderless
    >
      <v-btn to="/login">Login</v-btn>
      <v-btn to="/register">Registrarse</v-btn>
    </v-btn-toggle>
  </v-app-bar>
</template>

<script setup lang="ts">
  import { inject } from 'vue'
  import type { Ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const auth = inject<Ref<boolean>>('auth')
  if (!auth) {
    throw new Error('Auth not provided')
  }
  const safeAuth = auth as Ref<boolean>

  function logout() {
    localStorage.removeItem('auth_token')
    safeAuth.value = false
    router.push('/login')
  }
</script>