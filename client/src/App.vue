<template>
  <Navigation @logout="logout" />
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import Navigation from "./components/UI/Navigation.vue";
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
          console.log(this.$store.state.isLoggedIn);
          this.$store.state.isLoggedIn = false;
          console.log(this.$store.state.isLoggedIn);
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
