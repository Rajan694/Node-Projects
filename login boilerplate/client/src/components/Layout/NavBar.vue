<template>
  <nav
    class="navbar navbar-expand-lg border-bottom border-body fixed-top bg-body-tertiary"
  >
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand mb-1 p-1 ms-1"
        ><img
          src="../../assets/logo.svg"
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
            class="nav-link mb-1 p-1 ms-1"
            active-class="active bg-secondary"
            @click="show = 'collapse'"
            to="/login"
            >Login&signin</RouterLink
          >
          <RouterLink
            class="nav-link mb-1 p-1 ms-1"
            active-class="active bg-secondary"
            @click="show = 'collapse'"
            to="/user"
            >Details</RouterLink
          >
          <RouterLink
            class="nav-link mb-1 p-1 ms-1"
            active-class="active bg-secondary"
            @click="show = 'collapse'"
            to="/userdetail"
            >More Details</RouterLink
          >
        </div>
        <div class="navbar-nav mb-1 ms-1">
          <button class="btn btn-outline-primary" @click="myfunc">
            Change Theme
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
let show = ref("");
const myfunc = () => {
  let element = document.body;
  element.dataset.bsTheme =
    element.dataset.bsTheme == "dark" ? "light" : "dark";
};
</script>

<style scoped></style>
