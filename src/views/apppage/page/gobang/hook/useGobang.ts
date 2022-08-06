import { Ref } from "vue";

export type Player = "white" | "black";

export function useGobang(cvs: Ref<HTMLCanvasElement>) {
  let el = cvs.value as HTMLCanvasElement;
  let cxt = el.getContext("2d")!;
  const MARGIN = 30;
  const WIDTH = 500;
  const blockWidth = WIDTH / 16;
  // 棋盘
  const chessboard = Array.from({ length: 17 }, (_) => {
    return Array.from({ length: 17 }, (_) => 0);
  });
  // 玩家分数
  const myScore = Array.from({ length: 17 }, (_) => {
    return Array.from({ length: 17 }, (_) => 0);
  });
  // ai分数
  const aiScore = Array.from({ length: 17 }, (_) => {
    return Array.from({ length: 17 }, (_) => 0);
  });

  function getColOrRow(x: number) {
    return Math.floor((x - 30) / blockWidth + 0.5);
  }

  //方向
  const direction = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
    [-1, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
  ];

  //获取游戏状态
  function gameStatus(x: number, y: number) {
    let mid = chessboard[y][x];
    let count = 1;
    // 上半方向坐标
    let scoreXY = {
      x: 0,
      y: 0,
    };
    for (let i = 0; i < 8; i++) {
      let ox = x,
        oy = y;
      if (i % 2 === 0) {
        if (count >= 5) {
          return mid;
        }
        count = 1;
      }

      ox += direction[i][0];
      oy += direction[i][1];
      if (ox < 0 || ox > 16) break;
      if (oy < 0 || oy > 16) break;

      while (chessboard[oy][ox] === mid) {
        count++;
        ox += direction[i][0];
        oy += direction[i][1];
        if (ox < 0 || ox > 16) break;
        if (oy < 0 || oy > 16) break;
      }

      if (i % 2 == 1) {
        changeScore(ox, oy, count, mid);
        changeScore(scoreXY.x, scoreXY.y, count, mid);
      }
      // 记录上半方向坐标
      scoreXY.x = ox;
      scoreXY.y = oy;
    }
    // 判断最后一次方向
    if (count >= 5) {
      return mid;
    }

    return 0;
  }

  // 改变格子的获胜分数
  function changeScore(x: number, y: number, count: number, player: number) {
    let score = player === 1 ? myScore : aiScore;
    let mrgin = (player - 1) * 100;
    if (x < 0 || x > 16) return;
    if (y < 0 || y > 16) return;
    switch (count) {
      case 1:
        score[y][x] += 100 + mrgin;
        break;
      case 2:
        score[y][x] += 500 + mrgin;
        break;
      case 3:
        score[y][x] += 2000 + mrgin;
        break;
      case 4:
        score[y][x] += 10000 + mrgin;
        break;
    }
    console.log(player, score);
  }

  // 游戏入口
  const play = (x: number, y: number, color: Player) => {
    let cx = getColOrRow(x);
    let cy = getColOrRow(y);
    let status = step(cx, cy, color);
    if (status === -1 || status === 1) return status;
    return aiStep() !== 2 ? status : 2;
  };

  // 描绘步骤
  function step(x: number, y: number, color: Player) {
    //棋子半径
    let cWitdh = blockWidth * 0.4;
    if (chessboard[y][x] !== 0) return -1;
    if (x < 0 || x > 16) return -1;
    if (y < 0 || y > 16) return -1;
    cxt.save();
    cxt.beginPath();
    cxt.translate(blockWidth * x + 30, blockWidth * y + 30);
    cxt.fillStyle = color;
    cxt.arc(0, 0, cWitdh, 0, 2 * Math.PI, true);
    cxt.fill();
    cxt.stroke();
    cxt.restore();
    chessboard[y][x] = color === "white" ? 1 : 2;
    return gameStatus(x, y);
  }

  // AI下棋计算
  function aiStep() {
    let max = 0;
    let x = 0,
      y = 0;
    for (let i = 0; i < 17; i++)
      for (let j = 0; j < 17; j++) {
        // 当前格子不为空
        if (chessboard[i][j] !== 0) continue;
        if (myScore[i][j] > max) {
          max = myScore[i][j];
          (x = j), (y = i);
        }
        if (aiScore[i][j] >= max) {
          max = aiScore[i][j];
          (x = j), (y = i);
        }
      }
    return step(x, y, "black");
  }

  // 初始棋盘
  init();

  function init() {
    cxt.clearRect(0, 0, WIDTH + MARGIN * 2, WIDTH + MARGIN * 2);
    // 描绘棋盘
    cxt.beginPath();
    for (let i = 0; i <= 16; i++) {
      // 竖线
      cxt.moveTo(MARGIN + i * blockWidth, MARGIN);
      cxt.lineTo(MARGIN + i * blockWidth, MARGIN + WIDTH);
      //横线
      cxt.moveTo(MARGIN, MARGIN + i * blockWidth);
      cxt.lineTo(MARGIN + WIDTH, MARGIN + i * blockWidth);
    }
    cxt.stroke();

    let heidian = [
      { x: 8, y: 8 },
      { x: 4, y: 4 },
      { x: 4, y: 12 },
      { x: 12, y: 12 },
      { x: 12, y: 4 },
    ];
    // 棋盘黑点
    heidian.forEach((item) => {
      cxt.save();
      cxt.beginPath();
      cxt.translate(blockWidth * item.x + 30, blockWidth * item.y + 30);
      cxt.fillStyle = "black";
      cxt.arc(0, 0, 5, 0, 2 * Math.PI, true);
      cxt.fill();
      cxt.stroke();
      cxt.restore();
    });
  }

  return {
    play,
    getColOrRow,
  };
}
