<template>
  <div class="container">
    <div class="card">
      <p>First Name: {{ user.firstName }}</p>
      <p>Last Name: {{ user.lastName }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Access Type: {{ user.accessType }}</p>
      <Button
        v-if="user.role !== ''"
        :name="user.role"
        color="rgb(0,195,255)"
      />
    </div>
  </div>
</template>

<script>
import Button from "../UI/Button.vue";
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    getUser() {
      // ${this.$route.params.userId}
      fetch(`http://localhost:3000/admin/users/${this.$route.params.userId}`)
        .then((res) => res.json())
        .then((data) => {
          this.user = data.user;
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.getUser();
  },
  components: { Button },
};
</script>

<style scoped>
.container {
  width: 1000px;
  height: 80vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-size: 1.7rem;
  height: 300px;
  width: 500px;
  overflow: hidden;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  -webkit-transition: 0.1s ease-in-out;
  transition: 0.1s ease-in-out;
  padding: 1rem;
}

.card:hover {
  margin-top: -10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
@media screen and (max-width: 600px) {
  .card {
    margin-top: 70rem;
    font-size: 3rem;
    width: 50rem;
    height: 40rem;
  }
}
</style>