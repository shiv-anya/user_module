<template>
  <div class="container">
    <Card :value="quantity" title="Users" class="card" />
    <RolesList />
  </div>
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
      fetch(`${process.env.APP_BASE_URL}/admin/users`)
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
.container {
  width: 1000px;
  margin: 0 auto;
  padding: 2rem 0;
}
.card {
  text-align: center;
  font-size: 2rem;
}
</style>