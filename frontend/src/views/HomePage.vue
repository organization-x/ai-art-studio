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
              @click.prevent="($refs as any).inputColor.click()"
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
              @change="($refs as any).VueCanvasDrawing?.redraw()"
              ref="inputBackgroundColor"
              class="hidden-palatte"
            />
            <button
              type="button"
              @click.prevent="($refs as any).inputBackgroundColor.click()"
              class="btn-tool"
              :style="{ color: data.backgroundColor }"
            >
              <i class="fa-solid fa-fill-drip"></i>
            </button>
          </div>

          <button
            type="button"
            @click.prevent="($refs as any).VueCanvasDrawing.reset()"
            class="btn-tool"
          >
            <i class="fa-solid fa-trash"></i>
            <!-- fill background -->
          </button>
        </div>
        <div class="flex-grow-1 position-relative">
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
            class="rounded-1 border"
          />
          <Dragger
            @started="onDragStart()"
            @moved="onDrag($event)"
            :style="{
              position: 'absolute',
              left: data.width + 'px',
              top: data.height + 'px',
            }"
          />

          <h4>Text to Image</h4>
          <input
            class="form-control rounded-1"
            type="text"
            placeholder="Cartoon, Relistic, etc . . ."
            aria-label="default input example"
          />
        </div>
      </div>
      <div class="col-12"></div>
    </div>
    <div class="row">
      <div class="col-12">
        <h3>Output:</h3>
        <img :src="data.image" class="rounded-1" />
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import VueDrawingCanvas from "vue-drawing-canvas";
import { reactive, ref } from "vue";
import Dragger from "@/components/Dragger.vue";


const data = reactive({
  image: "",
  eraser: false,
  disabled: false,
  fillShape: false,
  line: 20,
  color: "#000000",
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
const VueCanvasDrawing = ref<any>(null)
let startX = 0
let startY = 0

function onDragStart() {
  startX = data.width
  startY = data.height
}

function onDrag($event) {
  // console.log("onDrag",$event)
  data.width = startX + $event.x
  data.height = startY + $event.y
  window.setTimeout(() => VueCanvasDrawing.value.redraw())
}
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

.text-box {
  background-color: rgba(139, 129, 129, 0.2);
  border-radius: 10px;
  width: 100%;
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

.tooltip-top {
  width: 120px;
  bottom: 100%;
  left: 50%;
  margin-left: -60px; /* Use half of the width (120/2 = 60), to center the tooltip */
}
</style>
    