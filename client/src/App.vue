<template>
  <Navigation @logout="logout" />
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import Navigation from "./components/UI/Navigation.vue";
import axios from "axios";
export default {
  name: "App",
  components: {
    Navigation,
  },
  methods: {
    logout() {
      axios
        .post("http://localhost:3000/logout")
        .then((data) => {
          console.log(data);
          this.$store.state.user = {};
          // console.log(this.$store.state.user);
          console.log(this.$store.state.isLoggedIn);
          this.$store.state.isLoggedIn = false;
          console.log(this.$store.state.isLoggedIn);
          this.$router.push("/login");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
