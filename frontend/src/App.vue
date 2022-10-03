
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-light text-decoration-none">
        <svg class="bi me-2" width="40" height="32">
          <use xlink:href="/" />
        </svg>
        <span class="fs-4">Keyo Art</span>
      </a>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li>
          <RouterLink to="/home" class="nav-link px-2 link-light">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/team" class="nav-link px-2 link-light">Team</RouterLink>
        </li>
        <li>
          <RouterLink to="/questions" class="nav-link px-2 link-light">Questions</RouterLink>
        </li>
        <li>
          <RouterLink to="/gallery" class="nav-link px-2 link-light">Gallery</RouterLink>
        </li>

        <button type="button" class="btn btn-outline-primary me-2">Login</button>
        <button type="button" class="btn btn-primary">Sign-up</button>
    </ul>
    </header>
  </div>

  <RouterView />

</template>

<style scoped>

</style>
