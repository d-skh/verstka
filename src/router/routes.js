const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'), // исправлено
    children: [
      { path: '', component: () => import('@/pages/desktop.vue') }, // исправлено
      { path: '/orders', component: () => import('@/pages/Orders.vue') }, // исправлено
      { path: '/support', component: () => import('@/pages/support.vue') }, // исправлено
      { path: '/devices', component: () => import('@/pages/devices.vue') } // исправлено
    ]
  },
  {
    path: '*',
    component: () => import('@/pages/Error404.vue') // исправлено
  }
]

export default routes