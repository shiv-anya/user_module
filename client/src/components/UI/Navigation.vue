<template>
  <header>
    <nav>
      <h2 v-if="isLoggedIn">{{ name }}</h2>
      <div>
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
          @submit.prevent="$emit('logout')"
          v-if="isLoggedIn"
          action="/logout"
          method="POST"
        >
          <Button name="Logout" color="rgb(0, 195, 255)" type="submit" />
        </form>
      </div>
    </nav>
  </header>
</template>

<script>
import Button from "./Button.vue";
export default {
  components: { Button },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    name() {
      return (
        this.$store.state.user.firstName + " " + this.$store.state.user.lastName
      );
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
  color: #fff;
}

nav ul {
  display: flex;
}
nav div {
  width: 85vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
}
nav ul li {
  list-style: none;
  margin: 0 3rem 0 3rem;
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