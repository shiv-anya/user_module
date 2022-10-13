<template>
  <div class="container">
    <p v-if="roles.length === 0">No roles yet.</p>
    <ul>
      <li v-for="role in roles" :key="role._id">
        <div class="card">
          <h3>{{ role.members.quantity }}</h3>
          <p>{{ role.name }}</p>
          <div class="actions">
            <form
              @submit.prevent="deleteRole(role._id)"
              method="DELETE"
              :action="`/admin/delete-role/${role._id}`"
            >
              <Button
                v-if="isAdmin"
                class="btn"
                name="Delete"
                color="#F11E1B"
                type="submit"
              />
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
      fetch(`${process.env.VUE_APP_BASE_URL}/admin/roles`)
        .then((res) => res.json())
        .then((data) => {
          this.roles = [...data];
        })
        .catch((err) => console.log(err));
    },
    deleteRole(roleId) {
      fetch(`${process.env.VUE_APP_BASE_URL}/admin/delete-role/${roleId}`, {
        method: "DELETE",
      })
        .then((res) => this.getResults())
        .then((data) => console.log(data))
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
  flex-direction: row;
  flex-wrap: wrap;
}
form {
  width: 280px;
  text-align: center;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 200px;
  width: 300px;
  font-size: 1.7rem;
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
  padding: 10px 35px;
  color: #000;
  border-radius: 20px;
  margin-top: 15px;
}
@media screen and (max-width: 600px) {
  .container {
    width: 100vw;
    margin: 0 auto;
    font-size: 3rem;
  }
  ul {
    flex-direction: column;
  }
  li {
    margin: 0 auto;
  }
  .card {
    justify-content: center;
    width: 50rem;
    height: 40rem;
    font-size: 6rem;
    margin: 20px 0 20px 0;
    padding: 1rem;
    text-align: center;
  }
  .card h3,
  p {
    margin-top: 20px;
  }
  form {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 40px;
  }
  a,
  .btn {
    font-size: 4rem;
    width: 300px;
    margin-left: 20px;
  }
}
</style>