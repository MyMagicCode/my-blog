<template>
  <div class="ColorPicker">
    <span class="colorSpan" @click="clickSpan"></span>
    <Teleport to="#app">
      <div class="select" ref="select" v-show="isShow" @click.stop="">
        <div
          class="colorSelect"
          :style="{ backgroundColor: 'rgb(' + R + ',' + G + ',' + B + ')' }"
        >
          <div class="white"></div>
          <div class="black" @mousedown.stop="mouseDown">
            <div
              class="kuang"
              :style="{ left: `${280 * S}px`, top: `${180 - 180 * V}px` }"
              ref="kuang"
            ></div>
          </div>
        </div>
        <div class="hua" @mousedown.stop="mouseDown1">
          <div class="hua_k" :style="{ top: `${180 * H}px` }" ref="hua_h"></div>
        </div>
        <div class="bgImage">
          <div
            class="alpha"
            :style="{
              background: `linear-gradient(to right,rgba(${R}, ${G}, ${B}, 0) 0%,${rbg} 100%)`,
            }"
            @mousedown.stop="mouseDown2"
          >
            <div class="alpha_k" ref="alpha_k"></div>
          </div>
        </div>
        <div class="colorform">
          <input v-model="rgba" type="text" class="input1" />
          <button class="bt1" @click="changeColor" @mousedown.stop="">
            OK
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";
import HSV2RGB from "./hook/useHSV2RGB";
import useMove from "./hook/useMove";
import RGB2HSV from "./hook/useRGB2HSV";
export default defineComponent({
  name: "ColorPicker",
  props: {
    modelValue: String,
  },
  meits: ["update:modelValue"],
  setup(props, { emit }) {
    const kuang = ref();
    const hua_h = ref();
    const alpha_k = ref();
    const select = ref();
    const isShow = ref(false);
    const rgba = ref(props.modelValue);
    const R = ref(255);
    const G = ref(0);
    const B = ref(0);
    const A = ref(0.2);
    const V = ref(0);
    const S = ref(0);
    const H = ref(0);
    const rbg = ref("");
    onMounted(() => {
      if (props.modelValue != "") {
        let t = /([0]\.)?[0-9]+/g;
        let x = rgba.value?.match(t);
        if (x) {
          rbg.value = `rgb(${x[0]},${x[1]},${x[2]})`;
          let hsv = RGB2HSV(
            parseFloat(x[0]),
            parseFloat(x[1]),
            parseFloat(x[2])
          );
          H.value = hsv.H;
          V.value = hsv.V;
          S.value = hsv.S;
          A.value = parseFloat(x[3]);
          alpha_k.value.style.left = A.value * 280 + "px";
          hua_h.value.style.top = H.value * 180 + "px";
          kuang.value.style.top = V.value * 180 + "px";
          kuang.value.style.left = S.value * 280 + "px";
        }
      }
    });

    watch([H, S, V, A], () => {
      const rgb = HSV2RGB(H.value * 360, S.value, V.value);
      rbg.value = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
      rgba.value = `rgba(${rgb.r},${rgb.g},${rgb.b},${A.value})`;
    });

    const changeSV = function (x: number, y: number) {
      S.value = parseFloat((x / 280).toFixed(2));
      V.value = parseFloat(((180 - y) / 180).toFixed(2));
    };

    const changeH = function (y: number) {
      H.value = parseFloat((y / 180).toFixed(2));
      const rgb = HSV2RGB(H.value * 360, 1, 1);
      R.value = rgb.r;
      G.value = rgb.g;
      B.value = rgb.b;
    };

    const changeA = (x: number) => {
      A.value = parseFloat((x / 280).toFixed(2));
    };

    const changeColor = () => {
      emit("update:modelValue", rgba.value);
      isShow.value = false;
    };
    const clickSpan = (e: any) => {
      select.value.style.left = e.pageX - e.layerX + 33 + "px";
      select.value.style.top = e.pageY - e.layerY - 100 + "px";
      const close = (e: any) => {
        if (e.target.className != "colorSpan") {
          isShow.value = false;
          window.removeEventListener("mousedown", close);
        }
      };
      window.addEventListener("mousedown", close);
      isShow.value = !isShow.value;
    };
    const { mouseDown } = useMove(kuang, changeSV, 1);
    const mouseDown1 = useMove(hua_h, changeH, 2)["mouseDown"];
    const mouseDown2 = useMove(alpha_k, changeA, 3)["mouseDown"];

    return {
      HSV2RGB,
      mouseDown,
      mouseDown1,
      mouseDown2,
      changeColor,
      clickSpan,
      kuang,
      hua_h,
      select,
      isShow,
      alpha_k,
      rgba,
      rbg,
      R,
      G,
      B,
      A,
      S,
      V,
      H,
    };
  },
});
</script>

<style scoped>
.bt1 {
  cursor: pointer;
  width: 60px;
  font-weight: 100;
  border-radius: 5px;
  line-height: 20px;
  background-color: white;
  border: 1px solid #cfcfcf;
}
.input1 {
  padding-left: 10px;
  border-radius: 5px;
  line-height: 20px;
  border: 1px solid #cfcfcf;
}
.input1:focus {
  border: 1px solid #9be0ee !important;
}
.colorform {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  width: 100%;
  height: 20px;
}
.alpha_k {
  box-shadow: 0px 0px 10px 1px #cfcfcf;
  border: 1px solid #cfcfcf;
  position: absolute;
  top: -1px;
  height: 100%;
  width: 5px;
  background-color: white;
}
.hua_k {
  box-shadow: 0px 0px 10px 1px #cfcfcf;
  border: 1px solid #cfcfcf;
  position: absolute;
  left: -1px;
  width: 100%;
  height: 5px;
  background-color: white;
}
.bgImage {
  --el-color-picker-alpha-bg-a: #ccc;
  --el-color-picker-alpha-bg-b: transparent;
  background-size: 12px 12px;
  background-position: 0 0, 6px 0, 6px -6px, 0 6px;
  background-image: linear-gradient(
      45deg,
      var(--el-color-picker-alpha-bg-a) 25%,
      var(--el-color-picker-alpha-bg-b) 25%
    ),
    linear-gradient(
      135deg,
      var(--el-color-picker-alpha-bg-a) 25%,
      var(--el-color-picker-alpha-bg-b) 25%
    ),
    linear-gradient(
      45deg,
      var(--el-color-picker-alpha-bg-b) 75%,
      var(--el-color-picker-alpha-bg-a) 75%
    ),
    linear-gradient(
      135deg,
      var(--el-color-picker-alpha-bg-b) 75%,
      var(--el-color-picker-alpha-bg-a) 75%
    );
  margin-top: 10px;
}
.alpha {
  position: relative;
  width: 280px;
  height: 12px;
  /* background: linear-gradient(
    to right,
    rgba(v-bind(R), v-bind(G), v-bind(B), 0) 0%,
    v-bind(rbg) 100%
  ); */
}
.hua {
  margin-left: 10px;
  position: relative;
  width: 12px;
  height: 180px;
  background: linear-gradient(
    to bottom,
    #f00 0%,
    #ff0 17%,
    #0f0 33%,
    #0ff 50%,
    #00f 67%,
    #f0f 83%,
    #f00 100%
  );
}
.kuang {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  border: 2px solid rgb(231, 231, 231);
}
.colorSpan {
  position: absolute;
  border: 5px solid white;
  box-shadow: 0px 0px 10px 2px #cfcfcf;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  width: 30px;
  height: 30px;
  background-color: v-bind(modelValue);
}
.select {
  z-index: 200;
  width: 325px;
  display: flex;
  flex-wrap: wrap;
  position: fixed;
  box-sizing: border-box;
  left: 32px;
  top: 80px;
  border-radius: 5px;
  box-shadow: 0px 0px 20px #cfcfcf;
  padding: 10px;
  background: rgb(255, 255, 255);
}
.ColorPicker {
  margin: 2px;
  display: inline-block;
  position: relative;
  width: 30px;
  height: 30px;
}
.white {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  height: 180px;
  background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
}
.black {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  width: 280px;
  height: 180px;
  background: linear-gradient(to top, #000, rgba(0, 0, 0, 0));
}
.colorSelect {
  position: relative;
  width: 280px;
  height: 180px;
  /* background-color: rgb(v-bind(R), v-bind(G), v-bind(B)); */
}
</style>
