<template>
        <div class="container">
            <RolesList/>
        </div>
</template>

<script>
import RolesList from "../components/roles/RolesList.vue"        
export default ({
        components: {
                RolesList
        }
})
</script>

<style scoped>
.container{
        width: 1000px;
        margin: 0 auto;
        padding: 2rem 0;
    }
</style>