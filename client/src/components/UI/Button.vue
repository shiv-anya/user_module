<template>
  <button :style="`background-color: ${color}`" type="type">
    {{ name }}
  </button>
</template>

<script>
export default {
  props: ["name", "color", "type"],
};
</script>

<style scoped>
button {
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  text-align: center;
  cursor: pointer;
  width: 100px;
  margin-right: 12px;
  color: #fff;
}
</style>