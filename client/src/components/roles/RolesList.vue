<template>
  <div class="container">
    <ul>
      <li v-for="role in roles" :key="role._id">
        <div class="card">
          <h3>{{ role.members.quantity }}</h3>
          <p>{{ role.name }}</p>
          <div class="actions">
            <form
              @submit="deleteRole(role._id)"
              method="DELETE"
              :action="`/admin/delete-role/${role._id}`"
            >
              <Button class="btn" name="Delete" color="#F11E1B" type="submit" />
              <router-link :to="`/admin/roles/${role._id}`">Manage</router-link>
            </form>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Button from "../UI/Button.vue";
export default {
  components: {
    Button,
  },
  data() {
    return {
      roles: [],
    };
  },
  methods: {
    getResults() {
      fetch("http://localhost:4000/admin/roles")
        .then((res) => res.json())
        .then((data) => {
          this.roles = [...data];
        })
        .catch((err) => console.log(err));
    },
    deleteRole(roleId) {
      fetch(`http://localhost:4000/admin/delete-role/${roleId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
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
ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 200px;
  width: 300px;
  font-size: 2rem;
  background-color: rgb(0, 195, 255);
  padding: 2rem;
  border-radius: 10px;
  margin: 0px 15px 10px 15px;
}
li {
  list-style: none;
}
ul li button {
  color: #000;
}
a,
.btn {
  background-color: #f4f4f4;
  text-decoration: none;
  font-size: 1rem;
  padding: 10px 20px;
  color: #000;
  border-radius: 20px;
  margin-top: 15px;
}
</style>