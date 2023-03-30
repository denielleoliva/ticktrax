
const routes = [
  {
    path: '/',
    component: () => import('layouts/landing.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/profile/:id', name: 'profile',  component: () => import('pages/profile.vue') },
      { path: '/dan', component: () => import('pages/dan.vue') },
      { path: '/signin', component: () => import('src/pages/signin.vue') },
      { path: '/register', component: () => import('src/pages/register.vue')},
      { path: '/form', component: () => import('pages/formPage.vue')},
      { path: '/ticks', component: () => import('src/pages/ticks.vue')},
      { path: '/2fa', component: () => import('src/pages/2fa.vue')},
      { path: '/list', component: () => import('src/pages/list')},
      { path: '/admin', component: () => import('src/pages/searchPage.vue')},
      { path: '/heatmap', component: () => import('src/pages/heatmap')}
      // { path: '/dashboard', component: () => import('src/pages/dashboard.vue')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
