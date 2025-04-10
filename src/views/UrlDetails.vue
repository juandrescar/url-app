<template>
  <v-container>
    <h1>📍 Detalles de la URL {{ id }}</h1>
    <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
    <div v-else>
      <Icon path={mdiGoogleChrome} size={1} />
      <v-icon>
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>google-chrome</title><path d="M12,20L15.46,14H15.45C15.79,13.4 16,12.73 16,12C16,10.8 15.46,9.73 14.62,9H19.41C19.79,9.93 20,10.94 20,12A8,8 0 0,1 12,20M4,12C4,10.54 4.39,9.18 5.07,8L8.54,14H8.55C9.24,15.19 10.5,16 12,16C12.45,16 12.88,15.91 13.29,15.77L10.89,19.91C7,19.37 4,16.04 4,12M15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12M12,4C14.96,4 17.54,5.61 18.92,8H12C10.06,8 8.45,9.38 8.08,11.21L5.7,7.08C7.16,5.21 9.44,4 12,4M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>
      </v-icon>

      <v-icon>mdi-home</v-icon>
      <v-icon>mdi-google-chrome</v-icon>
      <v-icon>mdi-firefox</v-icon>
      <v-icon>mdi-apple-safari</v-icon>
      <v-icon>mdi-microsoft-edge</v-icon>
      <v-icon>mdi-opera</v-icon>
      <v-icon>mdi-web</v-icon>

      <v-list>
          <v-chip
            v-for="(count, browser) in browserCounts"
            :key="browser"
            :prepend-icon="getBrowserIcon(browser)"
          >
            {{ browser }}
            <v-badge
              color="info"
              :content="count"
              inline
            ></v-badge>
          </v-chip>
      </v-list>
      
      <p>Visitas: {{ details.total }}</p>
      <v-list>
        <v-chip
          v-for="browser in details.browsers"
          :key="browser"
          :prepend-icon="getBrowserIcon(browser)"
        >
          {{ browser }}
        </v-chip>
      </v-list>

      <v-list>
        <v-chip
          prepend-icon="$vuetify"
          v-for="location in details.locations"
        >
          {{ location }}
        </v-chip>
      </v-list>

      <v-data-table 
        :items="details.items"
        :headers="headers"
      ></v-data-table>
    </div>
  </v-container>
</template>
  
<script lang="ts">
  import stats from "../apis/stats";
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
  },
  computed: {
    browserCounts(): Record<string, number> {
      return this.details.items.reduce((acc: Record<string, number>, item) => {
        acc[item.browser] = (acc[item.browser] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
    }
  },
};


function formatDate (value : Date) : string {
    return moment(String(value)).format('MM/DD/YYYY hh:mm');
  }
</script>