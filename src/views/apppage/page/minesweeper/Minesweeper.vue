<template>
  <div class="topbar">
    <span @click="selectMode(1)">简单</span>
    <span @click="selectMode(2)">一般</span>
    <span @click="selectMode(3)">困难</span>
  </div>
  <div class="Minesweeper">
    <p style="display: flex; align-items: center; justify-content: center">
      <IconParkOutlineTimer />{{ NowTimer }}&nbsp;&nbsp;&nbsp;<MdiMine />
      {{ mineRest }}
    </p>
    <div v-for="i in gameData" class="box1">
      <div
        v-for="t in i"
        class="item"
        :class="[{ mine: t.mine && t.isOpen }, { backgound: !t.isOpen }]"
        @click="clickCheck(t.x, t.y)"
        @contextmenu.prevent="rightCheck(t.x, t.y)"
      >
        <template v-if="t.flag">
          <Flag />
        </template>
        <template v-else-if="!t.isOpen"></template>
        <template v-else-if="t.mine">
          <MdiMine :color="'red'" />
        </template>
        <template v-else-if="t.countMine != 0">
          <span :style="{ color: fontColor(t.countMine) }">
            {{ t.countMine }}
          </span>
        </template>
      </div>
    </div>
  </div>
  <canvas class="cvs" ref="cvs" width="500" height="600"></canvas>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { useNow } from "@vueuse/core";
import { Minesweeper } from "./useMine";
import IconParkOutlineTimer from "./IconParkOutlineTimer.vue";
import MdiMine from "./MdiMine.vue";
import Flag from "./Flag.vue";

const game = ref<Minesweeper>(new Minesweeper(20, 16, 50));
const cvs = ref<HTMLCanvasElement>();

const mineRest = computed(() => {
  let count = 0;
  game.value.getGameChecks.forEach((items) => {
    items.forEach((item) => {
      if (item.flag) count++;
    });
  });
  return game.value.mineNumber - count;
});
const { now, pause, resume } = useNow({ controls: true });
pause();

const NowTimer = computed(() => {
  const num = Math.round(
    (now.value.getTime() - game.value.getGameDate.getTime()) / 1000
  );
  return num < 0 ? 0 : num;
});
// 游戏难度选择
const selectMode = (mode: number) => {
  if (cvs.value) cvs.value.style.display = "none";
  switch (mode) {
    case 1:
      game.value = new Minesweeper(10, 10, 15);
      break;
    case 2:
      game.value = new Minesweeper(15, 15, 30);
      break;
    case 3:
      game.value = new Minesweeper(20, 16, 50);
      break;
  }
};

const gameData = computed(() => {
  return game.value.getGameChecks;
});
const clickCheck = (x: number, y: number) => {
  game.value.clickCheck(x, y);
};
const rightCheck = (x: number, y: number) => {
  game.value.rightCheck(x, y);
};
const gameState = computed(() => {
  return game.value.getGameState;
});

const fontColor = (x: number) => {
  const colors = [
    "rgb(0, 87, 180)",
    "rgb(18, 148, 120)",
    "rgb(154, 16, 136)",
    "rgb(247, 212, 56)",
    "rgb(247, 145, 56)",
    "rgb(250, 143, 107)",
    "rgb(250, 107, 131)",
    "rgb(254, 45, 45)",
  ];
  return colors[x - 1];
};
watch(gameState, (t) => {
  if (t == "paly") resume();
  else pause();
  if (t == "lose") alert("游戏失败！");
  else if (t == "won") winGame();
});

function winGame() {
  if (cvs.value) cvs.value.style.display = "block";
  const confetti = require("canvas-confetti");
  const myConfetti = confetti.create(cvs.value, {
    particleCount: 300,
    spread: 80,
    origin: { y: 0 },
  });
  myConfetti();
  setTimeout(() => {
    myConfetti.reset();
    if (cvs.value) cvs.value.style.display = "none";
  }, 3000);
}
</script>

<style scoped>
.cvs {
  display: none;
  position: fixed;
  top: 100px;
  left: calc(50% - 250px);
  z-index: 99;
}
.topbar span {
  cursor: pointer;
  margin: 0px 5px;
  width: 80px;
  text-align: center;
  line-height: 30px;
  background-color: rgb(236, 245, 255);
  color: rgb(64, 158, 255);
  border: rgb(64, 158, 255) 1px solid;
  border-radius: 20px;
}

.topbar span:hover {
  background-color: rgb(64, 158, 255);
  color: #fff;
}

.topbar {
  width: fit-content;
  margin: 0px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
}
.backgound {
  background-color: rgb(69, 187, 250);
}
.backgound:hover {
  background-color: rgb(195, 223, 238);
}
.mine {
  background-color: rgb(255, 151, 151);
}
.item {
  cursor: pointer;
  display: flex;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  border: 1px solid #ffffff;
}
.box1 {
  display: flex;
}
.Minesweeper {
  padding-top: 5px;
  width: fit-content;
  margin: 0px auto;
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
