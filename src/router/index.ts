import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/asset-detail/:uid',
      name: 'assetDetail',
      component: () => import('../views/asset-detail/AssetDetailView.vue'),
      props: true
    }
  ]
});

export default router;
