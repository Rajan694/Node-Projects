<template>
  <div class="container">
    <div class="row">
      <!-- ------------------------------------------------------------------------------------------- -->
      <div class="col-sm-12 col-md-6">
        <h1>signin page</h1>
        <form @submit.prevent="signin()">
          <div class="mb-3">
            <label for="Name" class="form-label">Name</label>
            <input
              type="text"
              class="form-control"
              id="Name"
              v-model="sign.name"
            />
          </div>
          <div class="mb-3">
            <label for="age" class="form-label">age</label>
            <input
              type="number"
              class="form-control"
              id="age"
              v-model="sign.age"
            />
          </div>
          <div class="mb-3">
            <label for="Email1" class="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              id="Email1"
              v-model="sign.email"
            />
          </div>
          <div class="mb-3">
            <label for="Password1" class="form-label">Password</label>
            <input
              type="text"
              class="form-control"
              id="Password1"
              v-model="sign.password"
            />
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
      <!-- ------------------------------------------------------------------------------------------- -->
      <div class="col-sm-12 col-md-6">
        <h1>login page</h1>
        <form @submit.prevent="login()">
          <div class="mb-3">
            <label for="Email" class="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              id="Email"
              aria-describedby="emailHelp"
              v-model="logi.email"
            />
          </div>
          <div class="mb-3">
            <label for="Password" class="form-label">Password</label>
            <input
              type="text"
              class="form-control"
              id="Password"
              v-model="logi.password"
            />
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import cookies from "vue-cookies";
const router = useRouter();

const sign = {
  name: "",
  age: "",
  email: "",
  password: "",
};

async function signin() {
  try {
    const response = await axios.post(
      "http://localhost:3000/users/signin",
      sign,
      { withCredentials: true }
    );
    const token = response.data.token;
    // localStorage.setItem("token", token);
    cookies.set("token", token);
    router.push("/user");
  } catch (error) {
    console.log(error.data);
  }
}

const logi = {
  email: "",
  password: "",
};
async function login() {
  try {
    const response = await axios.post(
      "http://localhost:3000/users/login",
      logi,
      { withCredentials: true }
    );

    const token = response.data.token;
    // localStorage.setItem("token", token);
    cookies.set("token", token);
    router.push("/user");
  } catch (error) {
    console.log(error.response.data);
  }
}
onMounted(() => {
  if (cookies.get("token")) {
    router.push("/user");
  }
});
</script>

<style scoped></style>
