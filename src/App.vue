<script setup>
import {useFeedStore} from "./stores/feed";
const feed = useFeedStore()

let q = ""
</script>

<template>
  <header>
    <div class="container-fluid">
      <div class="row align-items-center my-2 ">
        <div class="col-auto">
          <div class="row row-cols-auto gx-2 align-items-center">
            <router-link to="/" class="fw-bolder fs-3">
              <svg height="24" width="24" viewBox="0 0 24 24" aria-label="Pinterest" role="img" class="d-block">
                <path fill="#E60023" d="M0 12c0 5.123 3.211 9.497 7.73 11.218-.11-.937-.227-2.482.025-3.566.217-.932 1.401-5.938 1.401-5.938s-.357-.715-.357-1.774c0-1.66.962-2.9 2.161-2.9 1.02 0 1.512.765 1.512 1.682 0 1.025-.653 2.557-.99 3.978-.281 1.189.597 2.159 1.769 2.159 2.123 0 3.756-2.239 3.756-5.471 0-2.861-2.056-4.86-4.991-4.86-3.398 0-5.393 2.549-5.393 5.184 0 1.027.395 2.127.889 2.726a.36.36 0 0 1 .083.343c-.091.378-.293 1.189-.332 1.355-.053.218-.173.265-.4.159-1.492-.694-2.424-2.875-2.424-4.627 0-3.769 2.737-7.229 7.892-7.229 4.144 0 7.365 2.953 7.365 6.899 0 4.117-2.595 7.431-6.199 7.431-1.211 0-2.348-.63-2.738-1.373 0 0-.599 2.282-.744 2.84-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12"/>
              </svg>
            </router-link>
            <router-link to="/" class="fw-bolder fs-3">310</router-link>
          </div>
        </div>

        <div class="col">
          <form @submit.prevent.stop="$router.push({name: 'home', query: {q}})">
            <div class="input-group rounded-pill">
              <input type="text" class="form-control bg-light rounded-end rounded-pill px-3" :value="feed.query" @input="event => q = event.target.value">
              <button type="submit" class="input-group-text rounded-start rounded-pill px-3" >
                <svg height="20" width="20" viewBox="0 0 24 24" aria-hidden="true" role="img">
                  <path fill="#555555" d="M10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6m13.12 2.88-4.26-4.26A9.842 9.842 0 0 0 20 10c0-5.52-4.48-10-10-10S0 4.48 0 10s4.48 10 10 10c1.67 0 3.24-.41 4.62-1.14l4.26 4.26a3 3 0 0 0 4.24 0 3 3 0 0 0 0-4.24"/>
                </svg>
              </button>
            </div>
          </form>
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
