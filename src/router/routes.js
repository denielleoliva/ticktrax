const routes = [
  {
    path: "/",
    component: () => import("layouts/landing.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      {
        path: "/profile/:id",
        name: "profile",
        component: () => import("pages/profile.vue"),
      },
      { path: "/dan", component: () => import("pages/dan.vue") },
      { path: "/login", component: () => import("pages/login.vue") },
      { path: "/form", component: () => import("pages/form.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
