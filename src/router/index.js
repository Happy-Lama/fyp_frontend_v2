// Composables
import { get_csrf_token } from '@/httpservice'
import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '@/store/app'



const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'stats',
        name: 'Statistics',
        component: () => import('@/views/StatisticsPage.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/Register.vue'),
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: () => import('@/views/Notifications.vue'),
      },
      {
        path: 'transformer',
        name: 'transformerstats',
        component: () => import('@/views/TransformerStatistics.vue')
      }
    ],
    meta: { authRequired: true }
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import('@/views/Login.vue'),
  //   meta: { authRequired: false }
  // }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})


// router.beforeEach((to, from, next)=>{
//   const appStore = useAppStore();
//   get_csrf_token('http://localhost:8000/dashboard/get_csrf_token/', appStore)
//   // get_csrf_token('https://fyp-backend-ot0p.onrender.com/dashboard/get_csrf_token/', appStore)
//   const isAuthenticated = appStore.logged_in; // Assuming you have a method to check authentication status

//   // Check if the route requires authentication and the user is not authenticated
//   if (to.meta.authRequired && !isAuthenticated) {
//     // Redirect to the login page
//     // next('/login');
//     next();
//   } else {
//     // If the route does not require authentication or the user is authenticated, proceed with navigation
//     next();
//   }
// })

export default router
