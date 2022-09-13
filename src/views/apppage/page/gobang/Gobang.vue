<template>
  <div class="Gobang">
    <canvas ref="cvs" width="560" height="560" @click="playing"></canvas>
    <div class="option">
      <span class="btn" @click="gameStart">开始游戏</span>
      <p class="player">我方：白棋</p>
      <p class="player">对方：黑棋</p>
      <h3 class="text">{{ gameText }}</h3>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useGobang, Player } from "./hook/useGobang";

type GameStatus = "await" | "play" | "lose" | "win";
const cvs = ref();
const gameStatus = ref<GameStatus>("await");
let game: any;
const gameText = ref("");
const player = ref<Player>("white");

onMounted(() => {
  game = useGobang(cvs);
});

watch(gameStatus, (vlue) => {
  if (vlue === "win") {
    gameText.value = "游戏胜利";
  } else if (vlue === "lose") {
    gameText.value = "你是真的菜！";
  }
});

const playing = (e: MouseEvent) => {
  if (gameStatus.value !== "play") return;
  const status = game.play(e.offsetX, e.offsetY, player.value);
  if (status === 1) {
    gameStatus.value = "win";
  }
  if (status === 2) {
    gameStatus.value = "lose";
  }
};

const gameStart = () => {
  gameStatus.value = "play";
  gameText.value = "";
  game = useGobang(cvs);
};
</script>

<style scoped>
.text {
  margin-left: 10px;
  margin-top: 20px;
  color: crimson;
}
.player {
  width: 100%;
  margin-left: 10px;
  margin-top: 10px;
  font-weight: 600;
}
.Gobang {
  width: 700px;
  height: 560px;
  display: flex;
  justify-content: space-between;
}
.option {
  box-sizing: border-box;
  padding-top: 30px;
  width: 130px;
  height: 100%;
}

.btn {
  display: block;
  cursor: pointer;
  width: 100px;
  text-align: center;
  line-height: 35px;
  background-color: rgb(255, 255, 255);
  color: rgb(102, 102, 102);
  border: rgb(102, 102, 102) 1px solid;
  border-radius: 20px;
}

.btn:hover {
  background-color: rgb(102, 102, 102);
  color: #fff;
}
</style>
