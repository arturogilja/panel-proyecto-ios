import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Pedidos from '../views/Pedidos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token')
      if (token) next({ name: 'Pedidos' })
      else next()
    },
  },
  {
    path: '/pedidos',
    name: 'Pedidos',
    component: Pedidos,
    beforeEnter: privateGuard,
  },
  {
    path: '*',
    redirect: '/',
  },
]

/**
 * @param {import('vue-router').Route} to
 * @param {import('vue-router').Route} from
 * @param {import('vue-router').NavigationGuardNext} next
 */
function privateGuard(to, from, next) {
  const token = localStorage.getItem('token')
  if (!token) next({ name: 'Login' })
  else next()
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
