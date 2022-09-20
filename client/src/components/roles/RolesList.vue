<template>
    <div class="container">
        <ul>
            <li
        v-for="role in roles"
        :key="role._id"
      >
      <div class="card">
                    <h3>{{role.members.length}}</h3>
                    <p>{{role.name}}</p>
                    <button>Manage Users</button>
                </div>
        </li>
        </ul>
        
    </div>
</template>

<script>

export default ({
    data() {
        return {
            roles: []
        }
  },
  methods: {
    getResults() {
      fetch('http://localhost:3000/admin/roles')
        .then(res => res.json())
        .then(data => {
          this.roles = [...data]
        })
          .catch(err => console.log(err))
    }
  },
    mounted() {
        this.getResults();
    }
    })
</script>

<style scoped>
    .container{
        width: 1000px;
        margin: 0 auto;
        padding: 2rem 0;
    }
    ul{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
.card{
    height: 200px;
    width: 300px;
    font-size: 2rem;
    background-color: rgb(0, 195, 255);
    padding: 2rem;
    border-radius: 10px;
    margin: 20px 15px; 
}
li{
    list-style: none;
}
button{
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    text-align: center;
    cursor: pointer;
}
</style>