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
  </div>
</template>

<script setup>
import { inject } from "vue";

let temp = inject("temp");
</script>

<style scoped></style>
