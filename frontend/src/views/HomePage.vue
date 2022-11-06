<template>
  <div class="container-fluid mt-4">
    <h2>Canvas</h2>
    <div class="row">
      <div class="col d-flex">
        <div class="d-flex flex-column pe-2">
          <!--Paint Brush-->
          <button
            @click="data.eraser = false"
            class="btn-tool"
            :class="{ active: !data.eraser }"
          >
            <i class="fa-solid fa-paintbrush"></i>
          </button>
          <!--erasser-->
          <button
            @click="data.eraser = true"
            class="btn-tool"
            :class="{ active: data.eraser }"
          >
            <i class="fa-solid fa-eraser"></i>
          </button>
          <select v-model="data.line" class="btn-tool">
            <option v-for="n in 25" :key="'option-' + n" :value="n">
              {{ n }}
            </option>
          </select>

          <!-- Palete -->
          <div class="hidden-palatte-parent">
            <input
              type="color"
              v-model="data.color"
              ref="inputColor"
              class="hidden-palatte"
            />
            <button
              type="button"
              @click.prevent="$refs.inputColor.click()"
              class="btn-tool"
              :style="{ color: data.color }"
            >
              <i class="fa-solid fa-palette"></i>
            </button>
          </div>

          <div class="hidden-palatte-parent">
            <input
              type="color"
              v-model="data.backgroundColor"
              :on-change="$refs.VueCanvasDrawing?.redraw()"
              ref="inputBackgroundColor"
              class="hidden-palatte"
            />
            <button
              type="button"
              @click.prevent="$refs.inputBackgroundColor.click()"
              class="btn-tool"
              :style="{ color: data.backgroundColor }"
            >
            <i class="fa-solid fa-fill-drip"></i>
            </button>
          </div>

          <button
            type="button"
            @click.prevent="$refs.VueCanvasDrawing.reset()"
            class="btn-tool"
          >
            <i class="fa-solid fa-trash"></i>
            <!-- fill background -->
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
            :width="data.width"
            :height="data.height"
          />
          <i class="fa-solid fa-eraser"></i>
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
  height: 400,
  width: 800,
});
</script>
  
<style lang="scss">
.btn-tool {
  width: 50px;
  height: 50px;
  overflow: hidden;
  background: transparent;
  border: none;
  color: rgba($color: #ffffff, $alpha: 1);

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    border: none;
  }
}

.active {
  color: rgba($color: #000000, $alpha: 1) !important;
}
.hidden-palatte-parent {
  position: relative;
}
.hidden-palatte {
  position: absolute;
  left: 100%;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
}
</style>
    