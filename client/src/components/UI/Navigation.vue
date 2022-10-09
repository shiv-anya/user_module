<template>
  <div class="header">
    <div class="navbar">
      <div class="main">
        <h2 v-if="isLoggedIn">{{ name }}</h2>
        <div @click="toggleHandler" class="burger">
          <i class="fas fa-bars fa-2x"></i>
        </div>
        <div class="times"><i class="fas fa-times fa-2x"></i></div>
      </div>
      <div class="menu">
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
    </div>
  </div>
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
          <Button
            class="btn"
            name="Logout"
            color="rgb(0, 195, 255)"
            type="submit"
          />
        </form>
      </div>
    </nav>
  </header>
</template>

<script>
import Button from "./Button.vue";
export default {
  components: { Button },
  methods: {
    toggleHandler() {
      const burger = document.getElementsByClassName("burger");
      const menu = document.getElementsByClassName("menu");
      const times = document.getElementsByClassName("times");
      burger[0].addEventListener("click", (e) => {
        menu[0].style.display = "block";
        times[0].style.display = "block";
        burger[0].style.display = "none";
      });
      times[0].addEventListener("click", (e) => {
        times[0].style.display = "none";
        burger[0].style.display = "block";
        menu[0].style.display = "none";
      });
    },
  },
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
  padding: 1rem;
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
.navbar {
  display: none;
}
@media screen and (min-width: 600px) and (max-width: 1000px) {
  nav {
    width: 1000px;
  }
  nav div {
    width: 100%;
  }
}
@media screen and (max-width: 600px) {
  nav {
    display: none;
  }
  .navbar {
    display: block;
    position: fixed;
    background-color: #333;
    width: 100%;
    font-size: 2.5rem;
    color: #fff;
  }
  .main {
    padding: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .times {
    display: none;
  }
  .menu {
    background-color: #fff;
    display: none;
  }
  .menu ul li {
    padding: 1rem;
    border-bottom: #f4f4f4 solid 2px;
  }
  .menu a {
    font-size: 4rem;
    color: #000;
    border: none;
  }
}
</style>