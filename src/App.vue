<script setup lang="ts">
import Navbar from './components/shared/Navbar.vue';


</script>

<template>
  <nav class="m-5">
    <Navbar/>
  </nav>
  
  <main>
    <router-view />
  </main>
  
</template>

<style scoped>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
  main {
    min-height: 70vh;
    width: 100%;
  }
</style>
