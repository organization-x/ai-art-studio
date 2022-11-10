<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div>
    <header class="d-flex flex-wrap justify-content-center py-3">
      <a
        href="/"
        class="d-flex align-items-center mb-3 ms-3 mb-md-0 me-md-auto text-light text-decoration-none"
      >
        <span class="fs-4">Keyo Art</span>
      </a>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li class="me-2">
          <RouterLink
            to="/home"
            class="nav-link px-2 text-light bold hover-underline-animation"
            >Canvas</RouterLink
          >
        </li>
        <li class="me-2">
          <RouterLink
            to="/team"
            class="nav-link px-2 text-light hover-underline-animation"
            >Team</RouterLink
          >
        </li>
        <li class="me-2">
          <RouterLink
            to="/questions"
            class="nav-link px-2 text-light hover-underline-animation"
            >FAQ</RouterLink
          >
        </li>
        <!-- <li>
          <RouterLink to="/gallery" class="nav-link px-2 text-light hover-underline-animation">Gallery</RouterLink>
        </li> -->
        <!-- 
        <button type="button" class="btn btn-outline-primary me-2">Login</button>
        <button type="button" class="btn btn-primary">Sign-up</button> -->
      </ul>
    </header>
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
header {
  background: linear-gradient(
    90deg,
    rgb(161, 48, 247) 0%,
    rgb(122, 24, 233) 35%,
    rgb(89, 0, 255) 100%
  );
  position: relative;
}

.hover-underline-animation {
  display: inline-block;
  position: relative;
  color: #73ec89;
}

.hover-underline-animation::after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 5px;
  bottom: 0;
  left: 0;
  background-color: #73ec89;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover::after,
.router-link-active::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

a.router-link-active {
  color: rgb(71, 71, 71) !important;
}

body {
  background-color: rgb(58, 53, 53);
}
</style>
