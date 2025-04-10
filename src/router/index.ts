import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Urls from '../views/Urls.vue';
import UrlDetails from '../views/UrlDetails.vue';

const routes = [
  { path: '/', component: Dashboard },
  { path: '/urls', component: Urls },
  { path: '/urls/:id', component: UrlDetails, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
