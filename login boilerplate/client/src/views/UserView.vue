<template>
  <div class="container">
    <div class="row" v-if="isloggedin">
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

      <div class="col-6">
        <button class="btn btn-danger" @click="logout()">Logout</button>
        <button class="btn btn-danger" @click="deleteuser()">delete</button>
      </div>
      <div class="col-12">
        <UserDetail />
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-12">
        <div class="alert alert-danger" role="alert">you are not logged in</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import UserDetail from "../components/UserDetail.vue";
import { onBeforeMount, reactive, ref, provide } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import cookies from "vue-cookies";

const router = useRouter();
let isloggedin = ref(false);
let temp = reactive({});
provide("temp", temp);
async function getdetails() {
  try {
    const response = await axios.get("http://localhost:3000/users/me", {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    });
    isloggedin.value = true;
    temp.value = response.data;
  } catch (error) {
    console.log(error.response.data);
    isloggedin.value = false;
  }

  // console.log(temp);
}

onBeforeMount(() => {
  getdetails();
});

function logout() {
  cookies.remove("token");
  router.push("/login");
}

function deleteuser() {
  axios.delete("http://localhost:3000/users/me", {
    headers: {
      Authorization: `Bearer ${cookies.get("token")}`,
    },
  });
  cookies.remove("token");
  router.push("/");
}
</script>

<style scoped></style>
