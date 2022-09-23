import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "./components/Dashboard/Dashboard";
import RolesPage from "./pages/RolesPage";
import UsersList from "./components/users/UsersList";
import UserForm from "./components/users/UserForm";
import RolesForm from "./components/roles/RolesForm";
import UserInfo from "./components/users/UserInfo";
import UserEditForm from "./components/users/UserEditForm";
import RoleEdit from "./components/roles/RoleEdit";

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
      path: "/admin/users/:userId",
      component: UserInfo,
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
      path: "/admin/edit-user/:userId",
      component: UserEditForm,
    },
    {
      path: "/admin/edit-role/:userId",
      component: RoleEdit,
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
