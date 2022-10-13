<template>
  <div class="container">
    <form @submit.prevent="addTeam" method="POST" action="/admin/add-role">
      <div class="inner">
        <label for="teamName">Team Name</label>
        <input
          type="text"
          name="teamName"
          id="teamName"
          v-model.trim="teamName"
          required
        />
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
      teamName: "",
    };
  },

  methods: {
    addTeam() {
      axios
        .post(`${process.env.VUE_APP_BASE_URL}/admin/add-team`, {
          name: this.teamName,
        })
        .then((data) => {
          this.teamName = "";
          this.$router.push("/admin/teams");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    Button,
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
@media screen and (max-width: 600px) {
  .container {
    padding-top: 18rem;
    font-size: 3rem;
  }
  .outer {
    flex-direction: column;
    font-size: 3rem;
  }
  form {
    border-bottom: 5px solid #f4f4f4;
    padding: 0 0 2rem 4rem;
  }
  .inner input {
    font-size: 3rem;
    width: 50rem;
    padding: 1rem;
    margin: 10px 0 10px 0;
  }
  .inner select {
    font-size: 3rem;
    width: 50rem;
    padding: 1rem;
    margin: 10px 0 2rem 0;
  }
  .inner option {
    font-size: 1rem;
  }
}
</style>