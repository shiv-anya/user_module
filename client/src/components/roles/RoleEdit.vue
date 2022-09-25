<template>
  <div class="container">
    <form @submit="editRole" method="PATCH" action="">
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
          <select name="users" id="users" v-model="members">
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
    <div class="members">
      <ul>
        <li v-for="member in members" :key="member._id">
          <div class="card" v-if="member.firstName !== undefined">
            <div class="member-info">
              <p class="mr">{{ member.firstName + " " + member.lastName }}</p>
              <p>{{ member.email }}</p>
            </div>
            <div class="actions">
              <form
                @submit="deleteUserFromRole(member._id)"
                method="DELETE"
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
      members: {},
    };
  },
  methods: {
    getUsers() {
      fetch("http://localhost:3000/admin/users")
        .then((res) => res.json())
        .then((data) => {
          this.users = [...data.users];
        })
        .catch((err) => console.log(err));
    },
    deleteUserFromRole(userId) {
      axios
        .delete(
          `http://localhost:3000/admin/roles/${this.$route.params.roleId}/${userId}`
        )
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    },
    editRole() {
      axios
        .patch(
          `http://localhost:3000/admin/roles/${this.$route.params.roleId}`,
          {
            name: this.roleName,
            members: this.members,
          }
        )
        .then((data) => {
          this.roleName = "";
          this.members = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRoleInfo() {
      fetch(`http://localhost:3000/admin/roles/${this.$route.params.roleId}`)
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
</style>