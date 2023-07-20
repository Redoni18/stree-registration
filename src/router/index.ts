import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomePage.vue'
import * as auth from "../helper/auth"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {requiresAuth: true}
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {requiresAuth: false}
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
      meta: {requiresAuth: false}
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    const isAuthenticated = checkAuthentication();

    if (isAuthenticated) {
        next();
    } else {
        next('/login');
    }
  } else {
    next()
  }

});

function checkAuthentication() {
  return auth.getLoggedInUser() !== null;
}


export default router
