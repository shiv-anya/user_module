<template>
  <UsersList />
</template>

<script>
import UsersList from "../components/users/UsersList.vue";

export default {
  components: {
    UsersList,
  },
};
</script>

<style scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  padding: 2rem 0;
}
</style>