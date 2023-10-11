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
          <!-- \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ -->
          <div>
            <input
              type="checkbox"
              class="checkbox"
              id="checkbox"
              @click="toggletheme()"
            />
            <label for="checkbox" class="checkbox-label">
              <img
                src="../../assets/moon.svg"
                alt="moon"
                style="width: 15px; height: 15px"
              />
              <img
                src="../../assets/sun.svg"
                alt="sun"
                style="width: 15px; height: 15px"
              />
              <span class="ball"></span>
            </label>
          </div>
          <!-- \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ -->
          <div @click="toggletheme()">
            <img
              v-if="theme == 'light'"
              src="../../assets/icons8-moon-90.png"
              alt="moon"
              style="cursor: pointer; width: 22px; height: 22px"
            />
            <img
              v-if="theme == 'dark'"
              src="../../assets/icons8-sun-240.png"
              alt="sun"
              style="cursor: pointer; width: 22px; height: 22px"
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

<style scoped>
.checkbox {
  opacity: 0;
  position: absolute;
}

.checkbox-label {
  background-color: #111;
  width: 50px;
  height: 26px;
  border-radius: 50px;
  position: relative;
  padding: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkbox-label .ball {
  background-color: #fff;
  width: 22px;
  height: 22px;
  position: absolute;
  left: 2px;
  top: 2px;
  border-radius: 50%;
  transition: transform 0.2s linear;
}

.checkbox:checked + .checkbox-label .ball {
  transform: translateX(24px);
}
</style>
