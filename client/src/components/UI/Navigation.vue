<template>
  <header>
    <nav>
      <ul>
        <li><router-link to="/">Dashboard</router-link></li>
        <li>
          <router-link to="/admin/users">Users</router-link>
        </li>
        <li><router-link to="/admin/roles">Roles</router-link></li>
      </ul>
      <Button name="Login" color="rgb(0, 195, 255)" />
    </nav>
  </header>
</template>

<script>
import Button from "./Button.vue";
export default {
  components: { Button },
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

a.active {
  border-bottom: 5px rgb(0, 195, 255) solid;
}
a:hover {
  border-bottom: 5px rgb(0, 195, 255) solid;
}
</style>