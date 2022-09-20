import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "./components/Dashboard/Dashboard";
import RolesPage from "./pages/RolesPage";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Dashboard },
    {
      name: "roles",
      path: "/admin/roles",
      component: RolesPage,
    },
    // {
    //   path: '/users',
    //   components: {

    //   },
    // { path: '/:notFound(.*)', component: NotFound }
  ],
  linkActiveClass: "active",
});

export default router;
