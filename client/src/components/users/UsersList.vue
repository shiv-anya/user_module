<template>
  <div class="container">
    <router-link v-if="isAdmin" to="/admin/add-user" class="btn btn-primary"
      >Add user</router-link
    >
    <p v-if="users.length === 0">No users yet.</p>
    <ul>
      <li v-for="user in users" :key="user._id">
        <div class="card">
          <router-link :to="`/admin/users/${user._id}`">
            <div class="user-info">
              <p>{{ user.firstName + " " + user.lastName }}</p>
              <div class="email">
                <p>{{ user.email }}</p>
                <Button
                  v-if="user.role !== ''"
                  :name="user.role"
                  color="rgb(0, 195, 255)"
                />
              </div>
            </div>
          </router-link>
          <div class="actions">
            <form
              @submit.prevent="deleteUser(user._id)"
              method="DELETE"
              :action="`/admin/delete-user/${user._id}`"
            >
              <Button
                v-if="isAdmin"
                name="Delete"
                color="#F11E1B"
                type="submit"
                class="z"
              />
              <router-link
                v-if="isAdmin"
                :to="`/admin/edit-user/${user._id}`"
                class="btn btn-success"
                >Edit</router-link
              >
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
      users: [],
    };
  },
  methods: {
    getResults() {
      fetch(`${process.env.VUE_APP_BASE_URL}/admin/users`)
        .then((res) => res.json())
        .then((data) => {
          const users = [...data.users];
          const presentUsers = users.filter((user) => {
            return user.email !== this.$store.state.user.email;
          });
          this.users = presentUsers;
        })
        .catch((err) => console.log(err));
    },
    deleteUser(userId) {
      fetch(`${process.env.VUE_APP_BASE_URL}/admin/delete-user/${userId}`, {
        method: "DELETE",
      })
        .then((res) => {
          this.getResults();
        })
        .then((data) => window.alert(data.data.message))
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.getResults();
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
  padding: 1.5rem;
  border-radius: 10px;
  margin: 10px 0px;
  background-color: #f4f4f4;
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
.user-info {
  width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.email {
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
@media screen and (max-width: 600px) {
  .container {
    padding-top: 14rem;
  }
  li {
    margin: 0 auto;
  }
  .card {
    margin-bottom: 2rem;
    flex-direction: column;
    justify-content: space-evenly;
    height: 30rem;
    margin-left: 2rem;
    font-size: 3.2rem;
    width: 50rem;
  }
  .user-info {
    flex-direction: column;
  }
  .email {
    flex-direction: column;
  }
  .btn {
    font-size: 3rem;
    width: 300px;
    margin-left: 2rem;
  }
  .card p {
    margin-bottom: 2rem;
  }
}
</style>