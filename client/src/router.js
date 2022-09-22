import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "./components/Dashboard/Dashboard";
import RolesPage from "./pages/RolesPage";
import UsersList from "./components/users/UsersList";
import UserForm from "./components/users/UserForm";
import RolesForm from "./components/roles/RolesForm";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Dashboard },
    {
      name: "roles",
      path: "/admin/roles",
      component: RolesPage,
    },
    {
      path: "/admin/users",
      component: UsersList,
    },
    {
      path: "/admin/roles",
      component: UsersList,
    },
    {
      path: "/admin/add-user",
      component: UserForm,
    },
    {
      path: "/admin/add-role",
      component: RolesForm,
    },
    {
      path: "/admin/delete-user/:userId",
      component: UsersList,
    },
    {
      path: "/admin/delete-role/:roleId",
      component: RolesPage,
    },
    // { path: '/:notFound(.*)', component: NotFound }
  ],
  linkActiveClass: "active",
});

export default router;
