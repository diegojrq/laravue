import { createRouter, createWebHistory } from 'vue-router'
import { useAlertStore } from '@/stores/alert'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Default/Default.vue'),

    children: [
      {
        path: '',
        name: 'home',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/logout',
        children: [
          {
            path: '',
            name: 'logout',
            meta: {
              requiresAuth: true,
            },
            component: () => import('@/views/auth/Login.vue'),
          },
        ],
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
    path: '/login',
    component: () => import('@/layouts/login/Login.vue'),
    
    children: [
      {
        path: '',
        name: 'login',
        meta: {
          requiresAuth: false,
        },
        component: () => import('@/views/auth/Login.vue'),
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
    ],
  },
]

export const router = createRouter({
  history: createWebHistory("/"),
  linkExactActiveClass: 'active',
  routes,
})

router.beforeEach((to) => {

  // url inválida
  if (to.matched.length === 0) {
    sendAlert('Página não encontrada!', 'A página que tentou acessar não existe! Verifique a URL acessada e tente novamente. ', 'warning')
    return { name: 'home' }
  }

  // verificar se a rota requer autenticação
  if (to.meta.requiresAuth) {
    const authStore = useAuthStore();

    if (!authStore.isAuthenticated()) {
      sendAlert('Acesso negado!', 'É necessário realizar o login para acessar este conteúdo.', 'warning')
      return { name: 'login' }
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
