<template>
  <div class="container">
    <router-link to="/admin/add-user" class="btn btn-primary"
      >Add user</router-link
    >
    <ul>
      <li v-for="user in users" :key="user._id">
        <router-link :to="`/admin/users/${user._id}`">
          <div class="card">
            <p>{{ user.firstName + " " + user.lastName }}</p>
            <p>{{ user.email }}</p>
            <div class="actions">
              <Button :name="user.role" color="rgb(0, 195, 255)" class="ml" />
              <form
                @submit="deleteUser(user._id)"
                method="DELETE"
                :action="`/admin/delete-user/${user._id}`"
              >
                <Button name="Delete" color="#F11E1B" type="submit" />
                <router-link
                  :to="`/admin/edit-user/${user._id}`"
                  class="btn btn-success"
                  >Edit</router-link
                >
              </form>
            </div>
          </div>
        </router-link>
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
      users: [],
    };
  },
  methods: {
    getResults() {
      fetch("http://localhost:4000/admin/users")
        .then((res) => res.json())
        .then((data) => {
          this.users = [...data.users];
        })
        .catch((err) => console.log(err));
    },
    deleteUser(userId) {
      fetch(`http://localhost:4000/admin/delete-user/${userId}`, {
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
  flex-direction: column;
  margin-top: 20px;
}
.actions {
  display: flex;
  flex-direction: row;
}
.ml {
  margin-right: 100px;
}
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  width: 1000px;
  font-size: 1rem;
  background-color: #f4f4f4;
  padding: 1.5rem;
  border-radius: 10px;
  margin: 10px 0px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #000;
}
.btn {
  border-radius: 10px;
  cursor: pointer;
  margin-right: 12px;
  color: #fff;
  padding: 10px 40px;
  font-size: 1rem;
  text-decoration: none;
  /* width: 200px; */
}
.btn-primary {
  background-color: rgb(0, 195, 255);
}
.btn-success {
  background-color: #81f11b;
}
</style>