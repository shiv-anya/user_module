<template>
  <div class="container">
    <form @submit.prevent="addRole" method="POST" action="/admin/add-role">
      <div class="outer">
        <div class="inner">
          <label for="rolename">Role Name</label>
          <input
            type="text"
            name="rolename"
            id="rolename"
            v-model.trim="roleName"
            required
          />
        </div>
        <div class="inner">
          <label for="users">Users</label>
          <select name="users" id="users" v-model="member">
            <option
              v-for="user in users"
              :value="user"
              :key="user._id"
              :aria-placeholder="{}"
            >
              {{
                user.firstName +
                " " +
                user.lastName +
                " (" +
                `${user.role ? user.role : "No Role"}` +
                ")"
              }}
            </option>
          </select>
        </div>
      </div>
      <div class="inner">
        <label for="teamName">Team Name</label>
        <select name="teams" id="teams" v-model="teamName">
          <option
            v-for="team in teams"
            :value="team.name"
            :key="team._id"
            placeholder=""
            required
          >
            {{ team.name }}
          </option>
        </select>
      </div>
      <Button name="Submit" color="rgb(0,195,255)" type="submit" />
    </form>
  </div>
</template>
  
  <script>
import Button from "../UI/Button.vue";
import axios from "axios";
export default {
  data() {
    return {
      users: [],
      roleName: "",
      teamName: "",
      teams: [],
      member: {},
    };
  },

  methods: {
    getUsers() {
      fetch(`${process.env.VUE_APP_BASE_URL}/admin/users`)
        .then((res) => res.json())
        .then((data) => {
          this.users = [...data.users];
        })
        .catch((err) => console.log(err));
    },
    getTeams() {
      fetch(`${process.env.VUE_APP_BASE_URL}/admin/teams`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length === 0) {
            window.alert("Create teams to add role.");
          }
          this.teams = [...data];
        })
        .catch((err) => console.log(err));
    },
    addRole() {
      if (this.teamName === "") {
        window.alert("Create teams to add role.");
        return;
      }
      axios
        .post(`${process.env.VUE_APP_BASE_URL}/admin/add-role`, {
          name: this.roleName,
          member: this.member,
          teamName: this.teamName,
        })
        .then((data) => {
          this.roleName = "";
          this.teamName = "";
          this.member = {};
          this.$router.push("/admin/roles");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    Button,
  },
  mounted() {
    this.getUsers();
    this.getTeams();
  },
};
</script>
  
  <style scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
}
.outer {
  width: 900px;
  display: flex;
  justify-content: space-between;
}
.inner {
  display: flex;
  flex-direction: column;
}
.inner input {
  width: 440px;
  padding: 0.3rem;
  margin: 10px 0 10px 0;
}
.inner select {
  width: 440px;
  padding: 0.3rem;
  margin: 10px 0;
}
select:focus,
input:focus {
  outline: none;
  border: 3px solid rgb(0, 195, 255);
  border-radius: 5px;
}
@media screen and (max-width: 600px) {
  .container {
    padding-top: 18rem;
    font-size: 3rem;
  }
  .outer {
    flex-direction: column;
    font-size: 3rem;
  }
  form {
    border-bottom: 5px solid #f4f4f4;
    padding: 0 0 2rem 4rem;
  }
  .inner input {
    font-size: 3rem;
    width: 50rem;
    padding: 1rem;
    margin: 10px 0 10px 0;
  }
  .inner select {
    font-size: 3rem;
    width: 50rem;
    padding: 1rem;
    margin: 10px 0 2rem 0;
  }
  .inner option {
    font-size: 1rem;
  }
}
</style>