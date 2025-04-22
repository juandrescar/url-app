import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Urls from '../views/Urls.vue';
import UrlDetails from '../views/UrlDetails.vue';
import UrlCreate from '../views/UrlCreate.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

const routes = [
  { path: '/', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/urls', component: Urls, meta: { requiresAuth: true } },
  { path: '/urls/create', component: UrlCreate, meta: { requiresAuth: true } },
  { path: '/urls/:id', component: UrlDetails, props: true, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('auth_token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.path === '/login' && isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
