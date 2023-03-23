<script setup>
import TheNavbar from './components/TheNavbar.vue';
</script>

<template>
  <the-navbar />
  <div class="container">
    <RouterView></RouterView>
  </div>
</template>

<style>
@import 'assets/style.css';
</style>
