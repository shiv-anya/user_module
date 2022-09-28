<template>
  <header>
    <nav>
      <ul>
        <li><router-link class="bb" to="/">Dashboard</router-link></li>
        <li>
          <router-link class="bb" to="/admin/users">Users</router-link>
        </li>
        <li><router-link class="bb" to="/admin/roles">Roles</router-link></li>
      </ul>
      <router-link v-if="!isLoggedIn" to="/login"
        ><Button name="Login" color="rgb(0, 195, 255)"></Button
      ></router-link>
      <router-link v-if="!isLoggedIn" to="/signup"
        ><Button name="Sign Up" color="rgb(0, 195, 255)"></Button
      ></router-link>
      <form
        @submit.prevent="logout"
        v-if="isLoggedIn"
        action="/logout"
        method="POST"
      >
        <Button
          @click="logout"
          name="Logout"
          color="rgb(0, 195, 255)"
          type="submit"
        />
      </form>
    </nav>
  </header>
</template>

<script>
import axios from "axios";
import Button from "./Button.vue";
export default {
  components: { Button },
  methods: {
    logout() {
      axios
        .post("http://localhost:3000/logout")
        .then((data) => {
          console.log(data);
          console.log(this.$store.state.isLoggedIn);
          this.$store.state.isLoggedIn = false;
          console.log(this.$store.state.isLoggedIn);
        })
        .catch((err) => console.log(err));
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
};
</script>

<style scoped>
nav {
  background-color: #333;
  height: 80px;
  display: flex;
  justify-content: end;
  align-content: center;
  align-items: center;
}
nav ul {
  display: flex;
}
nav ul li {
  list-style: none;
  margin: 0 2rem 0 2rem;
}
a {
  padding: 27px 10px;
  color: #fff;
  font-size: 1rem;
  text-decoration: none;
}
button {
  color: #fff;
  background-color: rgb(0, 195, 255);
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  margin-right: 15px;
}
.bb.active {
  border-bottom: 5px rgb(0, 195, 255) solid;
}
.bb:hover {
  border-bottom: 5px rgb(0, 195, 255) solid;
}
</style>