<template>
  <span>
  <span class="position-relative">
    <span class="position-absolute" @mousedown="mousedown($event)">
      <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
    </span>
  </span>
  </span>
</template>

<script setup lang="ts">
let emit = defineEmits(['started', 'moved', 'ended'])

let startX = -1
let startY = -1

function mousedown(e: MouseEvent) {
  startX = e.pageX
  startY = e.pageY

  document.addEventListener('mousemove', mouseMove, false);
  document.addEventListener('mouseup', mouseUp, false);
  emit("started")
}

function mouseMove(e: MouseEvent) {
  emit("moved", {x: e.pageX - startX, y: e.pageY - startY})
}

function mouseUp(e: MouseEvent) {
  document.removeEventListener('mousemove', mouseMove, false);
  document.removeEventListener('mouseup', mouseUp, false);
  emit("ended", {x: e.pageX - startX, y: e.pageY - startY})
}

</script>

<style scoped>
</style>
