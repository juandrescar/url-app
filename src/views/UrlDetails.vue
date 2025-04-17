<template>
  <v-container>
    <h1>📍 Detalles de la URL {{ details.short_code }}</h1>

    <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
    <div v-else>

      <v-row>
        <v-col cols="12" sm="10" class="pr-0">
          <v-card
            append-icon="mdi-link"
            class="my-4"
            :href=details.original_url
            rel="noopener"
            target="_blank"
            :subtitle=details.domain
            :title=details.title
            min-height="200"
          >
            <template v-slot:prepend>
              <v-avatar color="blue-darken-2"> 
                <v-img :src=details.favicon></v-img>
              </v-avatar>
            </template>
            <v-card-text>{{ details.description }}</v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="2" class="pl-0 pb-0">
          <v-card class="my-4">
            <v-img 
              :src=details.image
              cover
              :height="200"
              aspect-ratio="1/1"
            />
          </v-card>
        </v-col>
      </v-row>

      <v-card
        class="mb-3"
      >
        <v-card-text
          class="pb-0"
        >
          <h2 class="text-h6 mb-1">Total de visitas: {{ details.total }}</h2>
        </v-card-text>

        <v-card-text
          class="pt-0"
        >
          <h1 class="text-h6 mb-1">
            Navegadores
          </h1>

          <div>
            <v-chip
              class="mr-1"
              v-for="(count, browser) in browserCounts"
              :key="browser"
              :prepend-icon="getBrowserIcon(browser)"
              variant="outlined"
              label
            >
              {{ browser }}
              <v-badge
                color="secondary"
                :content="count"
                inline
              ></v-badge>
            </v-chip>
          </div>
        </v-card-text>

        <v-card-text
          class="pt-0"
        >
          <h2 class="text-h6 mb-1">Paises</h2>

          <div>
            <v-chip
                class="mr-1"
                v-for="(count, location) in locationCounts"
                :key="location"
                variant="outlined"
                label
              >
                {{ location }}
                <v-badge
                  color="secondary"
                  :content="count"
                  inline
                ></v-badge>
              </v-chip>
          </div>
        </v-card-text>
      </v-card>

      <v-data-table
        :headers="headers"
        :items="details.items"
        :header-props="{ class: 'myDarkTheme bg-primary text-white' }"
      >
        <template #item="{ item, index }">
          <tr :class="index % 2 === 0 ? 'even-row' : 'odd-row'">
            <td>{{ item.browser }}</td>
            <td class="text-end">{{ item.location }}</td>
            <td class="text-end">{{ item.createdAt }}</td>
            <!-- etc -->
          </tr>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>
  
<script lang="ts">
  import stats from "../apis/stats";
  import url from "../apis/urls";
  import moment from 'moment';

  const headers = [
    { title: 'Browser', align: 'start', key: 'browser' },
    { title: 'Lugar', align: 'end', key: 'location' },
    { title: 'Fecha', align: 'end', key: 'createdAt', value: ( item: Stat ) => formatDate(item.createdAt)},
  ];

  interface Stat {
    id: number;
    urlId: number;
    browser: string;
    location: string;
    createdAt: Date;
  }

  interface Details {
    total: number;
    browsers: string[];
    locations: string[];
    items: Stat[];
    original_url: string;
    short_code: string;
    title: string;
    image: string;
    favicon: string;
    description: string
    domain: string
  }

export default {
  props: ["id"],

  data() {
    return {
      details: {} as Details,
      loading: true,
      headers: headers,
      icons: {
        "Google Chrome": "mdi-google-chrome",
        Chrome: "mdi-google-chrome",
        Firefox: "mdi-firefox",
        Safari: "mdi-apple-safari",
        "Microsoft Edge": "mdi-microsoft-edge",
        Edge: "mdi-microsoft-edge",
        Opera: "mdi-opera",
      } as Record<string, string>,
    };
  },
  async created() {
    try {
      const response = await stats.get(`/stats?urlId=${this.id}`);
      const responseUrl = await url.get(`/urls/${this.id}`);

      this.details = responseUrl.data.data;
      this.details.items = response.data.data;
      this.details.total = response.data.total;
      this.details.locations = [...new Set(this.details.items.map(item => item.location))];
    } catch (error) {
      console.error("Error al obtener detalles", error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    getBrowserIcon(browser : string) {
      return this.icons[browser] || "mdi-web";
    },

     getRowClass(item: Details, index:number) {
      return index % 2 === 0 ? 'even-row' : 'odd-row'
    }
  },
  computed: {
    browserCounts(): Record<string, number> {
      return this.details.items.reduce((acc: Record<string, number>, item) => {
        acc[item.browser] = (acc[item.browser] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
    },

    locationCounts(): Record<string, number> {
      return this.details.items.reduce((acc: Record<string, number>, item) => {
        acc[item.location] = (acc[item.location] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
    }
  },
};


function formatDate (value : Date) : string {
    return moment(String(value)).format('MM/DD/YYYY hh:mm');
  }
</script>

<style scoped>

  :deep(.theme-card) {
    background-color: var(--v-theme-secondary);
    color: var(--v-theme-on-secondary);
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    max-width: 400px;
    margin: 32px auto;
    text-align: center;
    transition: background-color 0.3s ease;
  }

  .custom-box {
    background-color: var(--v-theme-secondary);
    color: var(--v-theme-on-secondary);
    padding: 16px;
    border-radius: 8px;
  }
.zebra-table tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}

.zebra-table tbody tr:nth-child(even) {
  background-color: #ffffff;
}

  .even-row {
    background-color: rgb(var(--v-theme-background)) !important;
  }
  
  .odd-row {
    background-color: rgb(var(--v-theme-surface)) !important;
  }

  tr:hover {
    background-color: rgb(var(--v-theme-on-surface), 0.5) !important;
    cursor: pointer;
  }
</style>