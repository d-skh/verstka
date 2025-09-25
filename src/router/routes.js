const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'), 
    children: [
      { path: '', component: () => import('@/pages/desktop.vue') },
      { path: '/orders', component: () => import('@/pages/Orders.vue') },
      { path: '/support', component: () => import('@/pages/support.vue') },
      { path: '/devices', component: () => import('@/pages/devices.vue') },
      { path: '/profile', component: () => import('@/pages/profile.vue') },
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