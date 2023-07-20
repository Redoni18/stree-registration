import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomePage.vue'
import LoginView from "@/views/Login.vue"
import RegisterView from "@/views/Register.vue"
import * as auth from "../helper/auth"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') {
    next();
  } else {
    const isAuthenticated = checkAuthentication();
    if (isAuthenticated) {
      next();
    } else {
      next('/login');
    }
  }

});

function checkAuthentication() {
  return auth.getLoggedInUser() !== null;
}


export default router
