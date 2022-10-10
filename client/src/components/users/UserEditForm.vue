<template>
  <div class="container">
    <form @submit.prevent="upadateUser" method="PATCH" action="">
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
      <div class="inner">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" v-model.trim="email" />
      </div>
      <div class="inner">
        <label for="roles">Roles</label>
        <select name="roles" id="roles" v-model="role">
          <option v-for="role in roles" :value="role.name" :key="role._id">
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
  components: {
    Button,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      accessType: "",
      roles: [],
      user: {},
    };
  },
  methods: {
    upadateUser() {
      axios
        .patch(
          `http://localhost:3000/admin/edit-user/${this.$route.params.userId}`,
          {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.user.password,
            role: this.role,
            accessType: this.accessType,
          }
        )
        .then((data) => {
          this.firstName = "";
          this.lastName = "";
          this.email = "";
          this.password = "";
          this.role = "";
          this.accessType = "";
          this.$router.push("/admin/users");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRoles() {
      fetch("http://localhost:3000/admin/roles")
        .then((res) => res.json())
        .then((data) => {
          this.roles = [...data];
        })
        .catch((err) => console.log(err));
    },
    getUserInfo() {
      fetch(`http://localhost:3000/admin/users/${this.$route.params.userId}`)
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
  mounted() {
    this.getRoles();
    this.getUserInfo();
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
  }
  .outer {
    flex-direction: column;
    font-size: 3rem;
  }
  .inner {
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