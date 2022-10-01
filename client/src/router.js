import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "./components/Dashboard/Dashboard";
import RolesPage from "./pages/RolesPage";
import UsersList from "./components/users/UsersList";
import UserForm from "./components/users/UserForm";
import RolesForm from "./components/roles/RolesForm";
import UserInfo from "./components/users/UserInfo";
import UserEditForm from "./components/users/UserEditForm";
import RoleEdit from "./components/roles/RoleEdit";
import Login from "./components/auth/Login.vue";
import SignUp from "./components/auth/SignUp.vue";
import store from "./store";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Dashboard, meta: { reqAuth: true } },
    { path: "/login", component: Login, meta: { reqAuth: false } },
    { path: "/signup", component: SignUp, meta: { reqAuth: false } },
    { path: "/logout", component: Login, meta: { reqAuth: true } },
    {
      name: "roles",
      path: "/admin/roles",
      component: RolesPage,
      meta: { reqAuth: true },
    },
    {
      path: "/admin/users",
      component: UsersList,
      meta: { reqAuth: true },
    },
    {
      path: "/admin/users/:userId",
      component: UserInfo,
      meta: { reqAuth: true },
    },
    {
      path: "/admin/roles",
      component: UsersList,
      meta: { reqAuth: true },
    },
    {
      path: "/admin/add-user",
      component: UserForm,
      meta: { reqAuth: true },
    },
    {
      path: "/admin/add-role",
      component: RolesForm,
      meta: { reqAuth: true },
    },
    {
      path: "/admin/edit-user/:userId",
      component: UserEditForm,
      meta: { reqAuth: true },
    },
    {
      path: "/admin/roles/:roleId",
      component: RoleEdit,
      meta: { reqAuth: true },
    },
    {
      path: "/admin/delete-user/:userId",
      component: UsersList,
      meta: { reqAuth: true },
    },
    {
      path: "/admin/delete-role/:roleId",
      component: RolesPage,
      meta: { reqAuth: true },
    },
    // { path: '/:notFound(.*)', component: NotFound }
  ],
  linkActiveClass: "active",
});

router.beforeEach((to, _, next) => {
  console.log("was here");
  const isLoggedIn = store.state.isLoggedIn;
  if (to.meta.reqAuth && isLoggedIn) {
    next();
  } else if (to.meta.reqAuth && !isLoggedIn) {
    next("/login");
  } else if (!to.meta.reqAuth && !isLoggedIn) {
    next();
  }
});

export default router;
