import { createRouter, createWebHistory } from 'vue-router';
import PageView from './views/PageView.vue';

  const routes = [
    {
      path: '/',
      name: 'Home',
      component: PageView, // Using the dynamic page component for the home route
    },
    {
      path: '/:slug',
      name: 'Page',
      component: PageView, // Using the same component for all dynamic pages
    }
  ];

  // Create router instance once routes are populated
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });


export default router;
