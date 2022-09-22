<template>
  <div class="container">
    <Button name="Add Role" color="rgb(0, 195, 255)" class="left" />
    <RolesList />
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
};
</script>

<style scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  padding: 2rem 0;
}
.left {
  margin-left: 15px;
}
</style>