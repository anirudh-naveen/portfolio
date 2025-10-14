<template>
  <div id="app">
    <AppNavbar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue'
</script>

<style>
body {
  margin: 0;
  background-color: #0d1912;
  color: #f4e4c1;
  font-family: "Poppins", sans-serif;
}
</style>
