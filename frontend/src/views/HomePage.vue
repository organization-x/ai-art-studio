<template>
  <div class="container-fluid mt-4">
    <div v-if="data.status === 'drawing'">
      <h2 class="fw-bold">Canvas</h2>
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
            </button>
            <button type="button" @click.prevent="send()" class="btn-tool">
              <i class="fa-solid fa-paper-plane"></i>
              <!-- fill background -->
            </button>
          </div>
          <div class="position-relative">
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
              class="form-control rounded-1 font-monospace"
              v-model="data.input"
              type="text"
              placeholder="Cartoon, Realistic, etc . . ."
              aria-label="default input example"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="data.status === 'sending'">
      <div class="row">
        <div class="col-12" role="status"></div>
        <div class="d-flex align-items-center">
          <p class="display-5 font-monospace">-_- Keyo is Thinking . . .</p>
          <div
            style="width: 3rem; height: 3rem"
            class="spinner-border ms-auto"
            role="status"
            aria-hidden="true"
          ></div>
        </div>
      </div>
    </div>

    <div v-if="data.status === 'success'">
      <div class="row">
        <div class="col-12">
          <h3 class="fw-bold">
            AI Generated Result:
            <button @click="data.status = 'drawing'" class="btn btn-secondary">
              DRAW AGAIN
            </button>
          </h3>
          <img
            v-bind:src="'data:image/jpeg;base64,' + data.imageResponse"
            height="512"
            width="758"
            class="rounded-1"
          />
          <br />
          <br />
          <h3>Original Image:</h3>
          <img
            v-bind:src="data.image"
            height="512"
            width="758"
            class="rounded-1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueDrawingCanvas from "vue-drawing-canvas";
import { reactive, ref } from "vue";
import Dragger from "@/components/Dragger.vue";

const data = reactive({
  status: "drawing" as "drawing" | "sending" | "success",
  image: "",
  imageResponse: "",
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
  input: "",
  height: 400,
  width: 800,
});
const VueCanvasDrawing = ref<any>(null);
let startX = 0;
let startY = 0;

function onDragStart() {
  startX = data.width;
  startY = data.height;
}

function onDrag($event: { x: number; y: number }) {
  // console.log("onDrag",$event)
  data.width = startX + $event.x;
  data.height = startY + $event.y;
  window.setTimeout(() => VueCanvasDrawing.value.redraw());
}

async function send() {
  data.status = "sending";

  const result = await fetch(
    "https://web-production-e1af.up.railway.app/generate",
    {
      method: "POST",
      body: JSON.stringify({
        input: data.input,
        start_img: data.image,
      }),
    }
  );

  const img = (await result.json())["img"];
  data.imageResponse = img;

  data.status = "success";
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
-->
