<template>
  <div class="container-fluid mt-4">
    <h2>Tools</h2>
    <div class="row">
      <div class="col d-flex">
        <div class="d-flex flex-column">
          <button
            @click="data.eraser = false"
            class="btn-tool"
            :class="{ active: !data.eraser }"
          >
            <i class="fa-solid fa-paintbrush"></i>
          </button>
          <button
            @click="data.eraser = true"
            class="btn-tool"
            :class="{ active: data.eraser }"
          >
            Erase
          </button>
          <select v-model="data.line" class="btn-tool">
            <option v-for="n in 25" :key="'option-' + n" :value="n">
              {{ n }}
            </option>
          </select>
          <input type="color" v-model="data.color" class="btn-tool" />
          <button
            type="button"
            @click.prevent="$refs.VueCanvasDrawing.reset()"
            class="btn-tool"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-file-earmark"
              viewBox="0 0 16 16"
            >
              <path
                d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"
              />
            </svg>
            Reset
          </button>
        </div>

        <div class="flex-grow-1">
          <VueDrawingCanvas
            ref="VueCanvasDrawing"
            v-model:image="data.image"
            :stroke-type="data.strokeType"
            :line-cap="data.lineCap"
            :line-join="data.lineJoin"
            :fill-shape="data.fillShape"
            :eraser="data.eraser"
            :lineWidth="data.line"
            :color="data.color"
            :background-color="data.backgroundColor"
            :lock="data.disabled"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h3>Output:</h3>
        <img :src="data.image" style="border: solid 1px #000000" />
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import VueDrawingCanvas from "vue-drawing-canvas";
import { reactive } from "vue";

const data = reactive({
  image: "",
  eraser: false,
  disabled: false,
  fillShape: false,
  line: 20,
  color: "black",
  strokeType: "dash",
  lineCap: "round",
  lineJoin: "round",
  backgroundColor: "#FFFFFF",
  backgroundImage: null,
  watermark: null,
  additionalImages: [],
});
</script>
  
<style lang="scss">
.btn-tool {
  width: 50px;
  height: 50px;
  overflow: hidden;
  background-color: rgba(63, 59, 59, );
  color: rgb(255, 255, 255);
  border: none;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    border: none;
  }
}

.active {
  background-color: rgba($color: #6d6c6c, $alpha: 0.9) !important;
  color: rgba($color: #000000, $alpha: 1) !important;
}
</style>
    