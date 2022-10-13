<template>
  <div class="container">
    <p v-if="teams.length === 0">No teams yet.</p>
    <ul>
      <li v-for="team in teams" :key="team._id">
        <div class="card">
          <h3>{{ team.roleQuantity }}</h3>
          <p>{{ team.name }}</p>
          <div class="actions">
            <form
              @submit.prevent="deleteTeam(team._id)"
              method="DELETE"
              :action="`/admin/delete-team/${team._id}`"
            >
              <Button
                v-if="isAdmin"
                class="btn"
                name="Delete"
                color="#F11E1B"
                type="submit"
              />
              <router-link :to="`/admin/teams/${team.name}`"
                >Manage</router-link
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
      teams: [],
    };
  },
  methods: {
    getTeams() {
      fetch(`${process.env.VUE_APP_BASE_URL}/admin/teams`)
        .then((res) => res.json())
        .then((data) => {
          this.teams = [...data];
        })
        .catch((err) => console.log(err));
    },
    deleteTeam(teamId) {
      fetch(`${process.env.VUE_APP_BASE_URL}/admin/delete-team/${teamId}`, {
        method: "DELETE",
      })
        .then((res) => this.getTeams())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.getTeams();
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
  font-size: 2rem;
  background-color: #f4f4f4;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
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
  background-color: #81f11b;
  text-decoration: none;
  font-size: 1rem;
  padding: 10px 35px;
  color: #fff;
  border-radius: 20px;
  margin-top: 15px;
}
@media screen and (max-width: 600px) {
  .container {
    width: 100vw;
    margin: 0 auto;
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