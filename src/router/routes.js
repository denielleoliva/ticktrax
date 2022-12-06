
const routes = [
  {
    path: '/',
    component: () => import('layouts/landing.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/profile/:id', name: 'profile',  component: () => import('pages/profile.vue') },
      { path: '/dan', component: () => import('pages/dan.vue') },
      { path: '/signin', component: () => import('src/pages/signin.vue') }
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
