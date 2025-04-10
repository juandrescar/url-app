<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import NavBar from './components/NavBar.vue';

export default {
  components: { NavBar },
};
</script>
