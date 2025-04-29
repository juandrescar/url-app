<template>
  <v-container>
    <v-alert
      v-if="!loading && error"
      type="error"
      class="mb-4"
      border="start"
      prominent
    >
      Error en la solicitud. Serás redirigido a la lista.
    </v-alert>

    <h1 v-if="!error">📍 Detalles de la URL {{ details.short_code }}</h1>

    <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
    <div v-else-if="!error">
      <Preview :details="details" />
      <TopComponent :total="details.total" :items="details.items"/>
      <History :items="details.items"/>
    </div>
  </v-container>
</template>
  
<script lang="ts">
  import stats from "../services/stats";
  import Preview from '../components/Preview.vue';
  import History from "../components/History.vue";
  import TopComponent from "../components/TopComponent.vue";
  import type { Details } from '../types';
  import urls from "../services/urls";

  export default {
    props: ["id"],

    components: {
      History,
      Preview,
      TopComponent
    },

    data() {
      return {
        details: {} as Details,
        loading: true,
        error: false,
        dialog: false
      };
    },
    async created() {
      try {
        const response = await stats.getStatUrl(this.id);
        const responseUrl = await urls.show(this.id);

        this.details = responseUrl.data.data;
        this.details.url = `${import.meta.env.VITE_URL_API}/${this.details.short_code}`
        this.details.items = response.data.data;
        this.details.total = response.data.total;
      } catch (error) {
        this.error = true;
        console.error("Error al obtener detalles", error);
        setTimeout(() => {
          this.$router.push('/urls');
        }, 3000);
      } finally {
        this.loading = false;
      }
    },
  };
</script>
