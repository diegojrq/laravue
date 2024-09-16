import { createRouter, createWebHistory } from 'vue-router'
import { useAlertStore } from '@/stores/alert'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/login/Login.vue'),
    
    children: [
      {
        path: '',
        name: 'index',
        meta: {
          requiresAuth: false,
        },
        component: () => import('@/views/Index.vue'),
      },
    ],
  },
  {
    path: '/home',
    component: () => import('@/layouts/default/Default.vue'),
    
    children: [
      {
        path: '',
        name: 'home',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/register',
    component: () => import('@/layouts/login/Login.vue'),
    
    children: [
      {
        path: '',
        name: 'register',
        meta: {
          requiresAuth: false,
        },
        component: () => import('@/views/auth/Register.vue'),
      },
    ],
  },  
  {
    path: '/logout',
    component: () => import('@/layouts/default/Default.vue'),
    
    children: [
      {
        path: '',
        name: 'logout',
        meta: {
          requiresAuth: false,
        },
        component: () => import('@/views/auth/Logout.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'admin',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/admin/Admin.vue'),
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            name: 'users',
            meta: {
              requiresAuth: true,              
            },
            component: () => import('@/views/admin/users/Users.vue'),
          },          
        ],
      },
      {
        path: 'view/:user',
        name: 'view-user',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/admin/users/User.vue'),
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory("/"),
  linkExactActiveClass: 'active',
  routes,
})

router.beforeEach((to) => {

  const authStore = useAuthStore();

  // url inválida
  if (to.matched.length === 0) {
    
    sendAlert('Page not found!', ['The page you are trying to access does not exist.'], 'warning')
    if (!authStore.isAuthenticated()) {
      return { name: 'index' }
    } else {
      return { name: 'home' }
    }
  }

  // verificar se a rota requer autenticação
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated()) {
      sendAlert('Access Denied!', ['You must be logged in to access this page.'], 'warning')
      return { name: 'index' }
    }
  }

  return true
})

function sendAlert (title, message, type, timeout = 4000) {
  let alertStore = useAlertStore()
  const alert = {
    title: title,
    message: message,
    timeout: timeout,
    type: type
  }
  alertStore.alerts.push({ ...alert })
}

export default router
