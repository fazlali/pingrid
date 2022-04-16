<script setup>
import {useFeedStore} from "./stores/feed";
const feed = useFeedStore()
function x() {
  console.log(arguments)
}
</script>

<template>
  <header>
    <div class="container-fluid">
      <div class="row align-items-center my-2 ">
        <div class="col-auto">
          <router-link to="/" class="fw-bolder fs-3">310</router-link></div>
        <div class="col">
          <input type="text" class="rounded-pill form-control bg-light" :value="feed.query" @input="event => feed.search(event.target.value)">
        </div>
        <div class="col-auto">
          <router-link to="/about">About</router-link>
        </div>
      </div>
    </div>
  </header>
  <main>
    <RouterView />
  </main>
</template>
