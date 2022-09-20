<template>
    <div class="card">
        <h3>{{value}}</h3>
        <p>{{title}}</p>
    </div>
</template>

<script>
    export default({
    name: 'Card',
    props: ['value', 'title'],
    })
</script>

<style scoped>
    .card {
  padding: 2.5rem;
  background-color: #fff;
  border-bottom: 1px solid rgb(199, 197, 197);
}
</style>