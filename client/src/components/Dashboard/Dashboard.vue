<template>
  <Card :value="quantity" title="Users" class="card" />
  <RolesList />
</template>

  <script>
import Card from "../UI/Card.vue";
import RolesList from "../roles/RolesList.vue";

export default {
  name: "Dashboard",
  data() {
    return {
      quantity: 0,
    };
  },
  components: {
    Navigation,
    Card,
    RolesList,
  },
  methods: {
    getResults() {
      fetch("http://localhost:4000/admin/users")
        .then((res) => res.json())
        .then((data) => {
          this.quantity = [...data.users].length;
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.getResults();
  },
};
</script>

  <style scoped>
.card {
  text-align: center;
  font-size: 2rem;
}
</style>