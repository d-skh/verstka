const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'), 
    children: [
      { path: '', component: () => import('@/pages/Desktop.vue') },
      { 
        path: '/orders', 
        name: 'orders',
        component: () => import('@/pages/Orders.vue') 
      },
      {
        path: '/orders/:id',
        name: 'order-detail', 
        component: () => import('@/components/OrderDetail.vue')
      },
      { path: '/support', component: () => import('@/pages/Support.vue') },
      { path: '/delivery', component: () => import('@/pages/DeliveryStatuses.vue') },
      { path: '/devices', component: () => import('@/pages/Devices.vue') },
      { path: '/profile', component: () => import('@/pages/Profile.vue') },
      { path: '/buttonsDemo', component: () => import('@/components/ButtonsDemo.vue') },
      { path: '/cardsDemo', component: () => import('@/components/CardsDemo.vue') },
      { path: '/colors', component: () => import('@/components/Colors.vue') },
      { path: '/dialogsDemo', component: () => import('@/components/DialogsDemo.vue') },
      { path: '/formsDemo', component: () => import('@/components/FormsDemo.vue') },
      { path: '/iconsTest', component: () => import('@/components/IconsTest.vue') },
      { path: '/spacingDemo', component: () => import('@/components/SpacingDemo.vue') }
    ]
  },
  {
    path: '*',
    component: () => import('@/pages/Error404.vue')
  }
]

export default routes