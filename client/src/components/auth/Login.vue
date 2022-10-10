<template>
  <div class="container">
    <form @submit.prevent="login" method="POST" action="/login">
      <div class="outer">
        <input
          type="email"
          name="email"
          id="email"
          v-model.trim="email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          v-model.trim="password"
          placeholder="Password"
          required
        />
        <Button
          class="btn"
          name="Login"
          color="rgb(0,195,255)"
          type="submit"
        ></Button>
      </div>
    </form>
  </div>
</template>
    
    <script>
import Button from "../UI/Button.vue";
import axios from "axios";
export default {
  components: {
    Button,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      axios
        .post(`http://localhost:3000/login`, {
          email: this.email,
          password: this.password,
        })
        .then((data) => {
          window.alert(data.data.message);
          const user = data.data.user;
          this.$store.state.user = user;
          user.accessType === "user"
            ? (this.$store.state.isAdmin = false)
            : (this.$store.state.isAdmin = true);
          if (data.token !== "") {
            console.log(this.$store.state.isLoggedIn);
            this.$store.state.isLoggedIn = true;
            this.email = "";
            this.password = "";
            console.log(this.$store.state.isLoggedIn);
            this.$router.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
    
  <style scoped>
.container {
  width: 1000px;
  height: 80vh;
  margin: 0 auto;
  padding: 2rem 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 1.2rem;
  align-items: center;
}
.outer {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #f4f4f4;
  padding: 2rem;
  border-radius: 5px;
}
input {
  width: 250px;
  padding: 0.3rem;
  margin: 10px 0 10px 0;
}
input:focus {
  outline: none;
  border: 3px solid rgb(0, 195, 255);
  border-radius: 5px;
}
.btn {
  width: 250px;
  margin: 0;
  margin-top: 10px;
}
@media screen and (max-width: 600px) {
  .container {
    padding-top: 40rem;
  }
  .outer {
    height: 30rem;
    width: 45rem;
  }
  .outer input {
    font-size: 3rem;
    width: 40rem;
    padding: 1rem;
    margin: 10px 0 10px 0;
  }
}
</style>