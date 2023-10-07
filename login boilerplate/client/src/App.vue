<template>
  <div class="container"><Navbar></Navbar></div>

  <RouterView />
</template>
<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Layout/NavBar.vue";
</script>

<style scoped></style>
