<template>
  <nav
    class="navbar navbar-expand-lg border-bottom border-body fixed-top bg-body-tertiary"
  >
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand mb-1 p-1 ms-1"
        ><img
          src="../../../public/favicon.ico"
          alt="Logo"
          width="30"
          height="24"
          class="d-inline-block align-text-top"
        />Login App</RouterLink
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        :class="show"
        id="navbarNavAltMarkup"
      >
        <div class="navbar-nav me-auto">
          <RouterLink
            class="nav-link mb-1 p-1 ms-1 rounded-1"
            active-class="active bg-secondary"
            @click="show = 'collapse'"
            to="/login"
            >Login&signin</RouterLink
          >
          <RouterLink
            class="nav-link mb-1 p-1 ms-1 rounded-1"
            active-class="active bg-secondary"
            @click="show = 'collapse'"
            to="/user"
            >Details</RouterLink
          >
        </div>
        <div class="navbar-nav mb-1 ms-1">
          <div @click="toggletheme()">
            <img
              v-if="theme == 'light'"
              src="../../assets/icons8-moon-90.png"
              alt="moon"
              style="cursor: pointer; width: 30px; height: 30px"
            />
            <img
              v-if="theme == 'dark'"
              src="../../assets/icons8-sun-240.png"
              alt="sun"
              style="cursor: pointer; width: 30px; height: 30px"
            />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
let show = ref("");
let theme = ref("dark");
const toggletheme = () => {
  let element = document.body;
  element.dataset.bsTheme =
    element.dataset.bsTheme == "dark" ? "light" : "dark";
  theme.value = element.dataset.bsTheme;
};
</script>

<style scoped></style>
