<template>
  <Navigation/>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import Navigation from './components/UI/Navigation.vue';
export default {
  name: 'App',
  components: {
    Navigation
}
}
</script>

<style>
  *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
</style>
