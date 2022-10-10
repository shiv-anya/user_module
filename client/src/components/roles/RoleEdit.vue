<template>
  <div class="container">
    <form v-if="isAdmin" @submit.prevent="editRole" method="PATCH" action="">
      <div class="outer">
        <div class="inner">
          <label for="rolename">Role Name</label>
          <input
            type="text"
            name="rolename"
            id="rolename"
            v-model.trim="roleName"
          />
        </div>
        <div class="inner">
          <label for="users">Users</label>
          <select name="users" id="users" v-model="member">
            <option v-for="user in users" :value="user" :key="user._id">
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
      <Button name="Submit" color="rgb(0,195,255)" type="submit" />
    </form>
    <p v-if="members.length === 0">No users in this role yet.</p>
    <div class="members" v-if="members.length > 0">
      <ul>
        <li v-for="member in members" :key="member._id">
          <div class="card" v-if="member.firstName !== undefined">
            <div class="member-info">
              <p>{{ member.firstName + " " + member.lastName }}</p>
              <p>{{ member.email }}</p>
            </div>
            <div class="actions">
              <form
                @submit.prevent="deleteUserFromRole(member._id)"
                method="DELETE"
                v-if="isAdmin"
                action=""
              >
                <Button name="Delete" color="#F11E1B" type="submit" />
              </form>
            </div>
          </div>
        </li>
      </ul>
    </div>
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
      member: {},
      members: {},
    };
  },
  methods: {
    getUsers() {
      fetch("${process.env.APP_BASE_URL}/admin/users")
        .then((res) => res.json())
        .then((data) => {
          this.users = [...data.users];
        })
        .catch((err) => console.log(err));
    },
    deleteUserFromRole(userId) {
      axios
        .delete(
          `${process.env.APP_BASE_URL}/admin/roles/${this.$route.params.roleId}/${userId}`
        )
        .then((res) => this.getRoleInfo())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    },
    editRole() {
      console.log(this.member._id);
      axios
        .patch(
          `${process.env.APP_BASE_URL}/admin/roles/${this.$route.params.roleId}`,
          {
            name: this.roleName,
            member: this.member,
          }
        )
        .then((data) => {
          this.getRoleInfo();
          this.roleName = "";
          this.members = {};
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRoleInfo() {
      fetch(
        `${process.env.APP_BASE_URL}/admin/roles/${this.$route.params.roleId}`
      )
        .then((res) => res.json())
        .then((data) => {
          const role = data.role;
          this.roleName = role.name;
          this.members = role.members.users;
        })
        .catch((err) => console.log(err));
    },
  },
  components: {
    Button,
  },
  mounted() {
    this.getUsers();
    this.getRoleInfo();
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
ul {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}
.actions {
  display: flex;
  flex-direction: row;
}
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  width: 900px;
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
.member-info {
  display: flex;
  width: 300px;
  justify-content: space-between;
  align-items: center;
}
@media screen and (max-width: 1000px) and (min-width: 600px) {
  .container {
    margin-left: 50px;
  }
}
@media screen and (max-width: 600px) {
  .container {
    padding-top: 15rem;
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
  .card {
    flex-direction: column;
    justify-content: space-between;
    height: 20rem;
    margin-left: 2rem;
    font-size: 3.2rem;
  }
  .member-info {
    flex-direction: column;
  }
}
</style>