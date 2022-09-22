<template>
  <Card value="28" title="Users" class="card" />
  <RolesList />
</template>

  <script>
import Card from "../UI/Card.vue";
import RolesList from "../roles/RolesList.vue";

export default {
  name: "Dashboard",
  components: {
    Navigation,
    Card,
    RolesList,
  },
};
</script>

  <style scoped>
.card {
  text-align: center;
  font-size: 2rem;
}
</style>