
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-light text-decoration-none">
        <span class="fs-4">Keyo Art</span>
      </a>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 page-tool">
        <li>
          <RouterLink to="/home" class="nav-link px-2 text-light bold">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/team" class="nav-link px-2 text-light">Team</RouterLink>
        </li>
        <li>
          <RouterLink to="/questions" class="nav-link px-2 text-light">Questions</RouterLink>
        </li>
        <li>
          <RouterLink to="/gallery" class="nav-link px-2 text-light">Gallery</RouterLink>
        </li>
<!-- 
        <button type="button" class="btn btn-outline-primary me-2">Login</button>
        <button type="button" class="btn btn-primary">Sign-up</button> -->
    </ul>
    </header>
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
a.router-link-active {color:rgb(71, 71, 71) !important} 

header{
background: linear-gradient(90deg, rgb(161, 48, 247) 0%, rgb(122, 24, 233) 35%, rgb(89, 0, 255) 100%);
position: relative;
}
.page-tool{

//   .underline-hover-effect {
//   display: inline-block;
//   padding-bottom: 0.25rem; /* defines the space between text and underline */
//   position: relative;
// }

// .underline-hover-effect::before {
//   content: "";
//   position: absolute;
//   left: 0;
//   bottom: 0;
//   width: 0;
//   height: 2px;
//   background-color: rgb(0, 255, 0);
//   transition: width 0.25s ease-out;
// }
// .underline-hover-effect:hover::before {
//   width: 100%;
// }

  :hover {
    background-color: rgba(0, 0, 0, 0.2);
    border: none;
  }
  }


body{
  background-color: rgb(58, 53, 53);
}

</style>
