<template>
  <div class="container">
    <form @submit.prevent="editRole" method="PATCH" action="">
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
              {{ user.firstName + " " + user.lastName }}
            </option>
          </select>
        </div>
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
      member: {},
    };
  },
  methods: {
    getUsers() {
      fetch("http://localhost:4000/admin/users")
        .then((res) => res.json())
        .then((data) => {
          console.log(data.users);
          this.users = [...data.users];
        })
        .catch((err) => console.log(err));
    },
    editRole() {
      axios
        .post("http://localhost:4000/admin/add-role", {
          name: this.roleName,
          member: this.member,
        })
        .then((data) => {
          this.roleName = "";
          this.member = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRoleInfo() {
      fetch(`http://localhost:4000/admin/roles/${this.$route.params.userId}`)
        .then((res) => res.json())
        .then((data) => {
          const user = data.user;
          this.user = user;
          this.firstName = user.firstName;
          this.lastName = user.lastName;
          this.email = user.email;
          this.role = user.role;
          this.accessType = user.accessType;
        })
        .catch((err) => console.log(err));
    },
  },
  components: {
    Button,
  },
  mounted() {
    this.getUsers();
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
</style>