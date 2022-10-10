<template>
  <div class="mb">
    <div class="container">
      <router-link v-if="isAdmin" to="/admin/add-role">Add Role</router-link>
      <RolesList />
    </div>
  </div>
</template>

<script>
import RolesList from "../components/roles/RolesList.vue";
import Button from "../components/UI/Button.vue";
export default {
  components: {
    RolesList,
    Button,
  },
  computed: {
    isAdmin() {
      return this.$store.state.isAdmin;
    },
  },
};
</script>

<style scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  padding: 2rem 0;
}
a {
  background-color: rgb(0, 195, 255);
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  text-align: center;
  cursor: pointer;
  width: 100px;
  color: #fff;
  margin-left: 15px;
  text-decoration: none;
}
@media screen and (max-width: 600px) {
  a {
    padding: 2rem 4rem;
    margin-left: 6rem;
    font-size: 3rem;
    width: 300px;
  }
  .mb {
    padding-top: 12rem;
  }
}
</style>