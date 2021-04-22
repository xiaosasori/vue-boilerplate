import { createRouter, createWebHistory } from 'vue-router'
import { loadView } from './routerUtils'
import { checkPermission } from '@/components/common/permission/checkPermission'
import Home from '../views/Home.vue'
import performanceOptimisationRoutes from '@/views/performance-optimisation/performanceOptimisationRoutes'
import apiLayerRoutes from '@/views/api-layer/apiLayerRoutes'
import securityRoutes from '@/views/security/securityRoutes'

// const routes: Array<RouteRecordRaw> = [
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/examples',
    name: 'Examples',
    redirect: '/api-layer',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "examples" */ '../views/Examples.vue')
  },
  ...apiLayerRoutes,
  ...performanceOptimisationRoutes,
  ...securityRoutes,
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: loadView('NotFound'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // If there are no permissions to check then proceed
  if (!to.meta.permission) return next()

  const { roles = [], config = {} } = to.meta.permission

  if (!roles.length) return next()

  const hasAccess = checkPermission(roles, config)
  console.log('has access???', hasAccess)
  if (hasAccess) {
    return next()
  }
  // No access!
  next(to.meta.permission?.noAccessRedirect || '/forbidden')
})

export default router
