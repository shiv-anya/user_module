<template>
  <div class="card">
    <h3>{{ value }}</h3>
    <p>{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["value", "title"],
};
</script>

<style scoped>
.card {
  padding: 2.5rem;
  background-color: #fff;
  border-bottom: 1px solid rgb(199, 197, 197);
}
@media screen and (max-width: 600px) {
  .card {
    margin-top: 10rem;
    height: 20rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-bottom: 3px solid rgb(199, 197, 197);
  }
  .card p,
  h3 {
    font-size: 6rem;
  }
}
</style>