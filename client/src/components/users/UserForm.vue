<template>
  <div class="container">
    <form @submit.prevent="addUser" method="POST" action="/admin/add-user">
      <div class="outer">
        <div class="inner">
          <label for="firstname">First name</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            v-model.trim="firstName"
          />
        </div>
        <div class="inner">
          <label for="lastname">Last name</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            v-model.trim="lastName"
          />
        </div>
      </div>
      <div class="outer">
        <div class="inner">
          <label for="email">Email</label>
          <input type="email" name="email" id="email" v-model.trim="email" />
        </div>
        <div class="inner">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model.trim="password"
          />
        </div>
      </div>
      <div class="inner">
        <label for="roles">Roles</label>
        <select name="roles" id="roles" v-model="roles">
          <option v-for="role in roles" :value="role" :key="role._id">
            {{ role.name }}
          </option>
        </select>
      </div>
      <div class="inner">
        <label for="accesstype">Access Type</label>
        <select name="accesstype" id="accesstype" v-model.trim="accessType">
          <option value="user">User</option>
          <option value="admin">Admin</option>
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
      accessType: "",
      roles: [],
    };
  },
  methods: {
    addUser() {
      axios
        .post("http://localhost:4000/admin/add-user", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          role: this.role,
          accessType: this.accessType,
        })
        .then((data) => {
          this.firstName = "";
          this.lastName = "";
          this.email = "";
          this.password = "";
          this.role = "";
          this.accessType = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getResults() {
      fetch("http://localhost:4000/admin/roles")
        .then((res) => res.json())
        .then((data) => {
          this.roles = [...data];
        })
        .catch((err) => console.log(err));
    },
  },
  components: {
    Button,
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