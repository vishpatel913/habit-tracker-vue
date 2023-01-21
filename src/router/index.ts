import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/create",
    name: "create",
    component: () => import("@/views/CreateHabitView.vue"),
  },
  {
    path: "/habit/:id",
    name: "habit",
    component: () => import("@/views/HabitView.vue"),
    meta: {
      hasBack: true,
    },
  },
  {
    path: "/habit/:id/edit",
    name: "edit",
    component: () => import("@/views/EditHabitView.vue"),
    meta: {
      hasBack: true,
    },
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
