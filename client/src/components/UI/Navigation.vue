<template>
  <header>
    <nav>
      <ul>
        <li class="active"><router-link to="/">Dashboard</router-link></li>
        <li>Users</li>
        <li><router-link to="/admin/roles">Roles</router-link></li>
      </ul>
      <button>Login</button>
    </nav>
  </header>
</template>

<script>
export default {};
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