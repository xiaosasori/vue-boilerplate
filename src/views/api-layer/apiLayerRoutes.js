import { withNestedView } from '@/router/routerUtils'
import { resolveComponent, h } from 'vue'

const loadView = withNestedView('api-layer')

const apiLayerRoutes = [
  {
    name: 'ApiLayer',
    path: '/api-layer',
    component: {
      render: () => h(resolveComponent('router-view')),
    },
    redirect: '/api-layer/status-handling',
    children: [
      {
        name: 'ApiStatusExample',
        path: 'status-handling',
        component: loadView('status-handling/ApiStatusExample'),
      },
      {
        name: 'AbortingRequests',
        path: 'aborting-requests',
        component: loadView('aborting-requests/AbortingRequests'),
      },
    ],
  },
]

export default apiLayerRoutes
