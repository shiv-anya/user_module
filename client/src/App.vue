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
        .post(process.env.APP_BASE_URL + "/logout")
        .then((data) => {
          this.$store.state.user = {};
          this.$store.state.isLoggedIn = false;
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
