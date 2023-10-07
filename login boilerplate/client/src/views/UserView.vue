<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <table class="table table-striped" v-if="temp.value">
          <thead>
            <tr>
              <th scope="col">field</th>
              <th scope="col">value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in Object.keys(temp.value)">
              <td>{{ item }}</td>
              <td>{{ temp.value[item] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-6">
      <button class="btn btn-danger" @click="logout()">Logout</button>
      <button class="btn btn-danger" @click="deleteuser()">delete</button>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
let temp = reactive({});

async function getdetails() {
  const response = await axios.get("http://localhost:3000/users/me", {
    headers: {
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
      Authorization: `Bearer ${this.$cookies.get("token")}`,
    },
  });

  temp.value = response.data;

  // console.log(temp);
}

onBeforeMount(() => {
  getdetails();
});

function logout() {
  localStorage.removeItem("token");
  router.push("/login");
}

function deleteuser() {
  axios.delete("http://localhost:3000/users/me", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  localStorage.removeItem("token");
  router.push("/");
}
</script>

<style scoped></style>
