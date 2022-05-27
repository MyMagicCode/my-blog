interface ICheckState {
  x: number;
  y: number;
  flag: boolean;
  isOpen: boolean;
  mine: boolean;
  countMine: number;
}

const map = [
  [1, 1],
  [1, 0],
  [1, -1],
  [0, 1],
  [0, -1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
];

type startType = "paly" | "won" | "lose";

export class Minesweeper {
  private width: number;
  private height: number;
  mineNumber: number;
  private gameState?: startType;
  private gameDate: Date;
  private gameChecks: ICheckState[][];
  constructor(x: number, y: number, mineNumber: number) {
    this.height = y;
    this.width = x;
    this.gameDate = new Date();
    this.mineNumber = mineNumber;
    this.gameChecks = this.initChecks();
  }
  get getGameChecks() {
    return this.gameChecks;
  }
  get getGameState() {
    return this.gameState;
  }
  get getGameDate() {
    return this.gameDate;
  }
  initChecks() {
    return Array.from({ length: this.height }, (_, i) => {
      return Array.from({ length: this.width }, (_, j) => {
        return {
          x: j,
          y: i,
          flag: false,
          isOpen: false,
          mine: false,
          countMine: 0,
        } as ICheckState;
      });
    });
  }
  initGame(x: number, y: number) {
    this.randomMine(x, y);
    this.initStart();
  }

  randomInt(start: number, end: number) {
    let max = end - start;
    const X = Math.round(Math.random() * max) + start;
    return X;
  }

  reGame() {
    // this.initChecks();
    // this.initGame();
  }

  initStart() {
    this.gameChecks.forEach((starts) => {
      starts.forEach((start) => {
        map.forEach((item) => {
          const x = start.x + item[0];
          const y = start.y + item[1];
          if (x < 0 || x >= this.width) return;
          if (y < 0 || y >= this.height || start.mine) return;
          start.countMine += this.gameChecks[y][x].mine ? 1 : 0;
        });
      });
    });
  }

  randomMine(clickx: number, clicky: number) {
    let count = this.mineNumber;
    while (count > 0) {
      const x = this.randomInt(0, this.width);
      const y = this.randomInt(0, this.height);
      if (x < 0 || x >= this.width) continue;
      if (y < 0 || y >= this.height) continue;
      if (clickx == x && clicky == y) continue;
      if (this.gameChecks[y][x].mine != true) {
        this.gameChecks[y][x].mine = true;
        count--;
      }
    }
  }

  rightCheck(x: number, y: number) {
    if (this.gameChecks[y][x].isOpen) return;
    this.gameChecks[y][x].flag = !this.gameChecks[y][x].flag;
  }

  iswin() {
    let count = 0;
    this.gameChecks.forEach((item) => {
      item.forEach((state) => {
        if (!state.isOpen) count++;
      });
    });

    if (count == this.mineNumber) {
      this.gameState = "won";
    }
  }

  clickCheck(x: number, y: number) {
    const openCheck = (x: number, y: number) => {
      this.gameChecks[y][x].isOpen = true;
      if (this.gameChecks[y][x].countMine == 0)
        map.forEach((item) => {
          const X = x + item[0];
          const Y = y + item[1];
          if (X < 0 || X >= this.width) return;
          if (Y < 0 || Y >= this.height) return;
          const itemState = this.gameChecks[Y][X];
          if (itemState.isOpen || itemState.flag || itemState.mine) return;
          itemState.isOpen = true;
          if (itemState.countMine == 0) {
            openCheck(X, Y);
          }
        });
    };

    if (this.gameState == undefined) {
      this.initGame(x, y);
      this.gameState = "paly";
      this.gameDate = new Date();
    }
    if (this.gameState != "paly") return;
    if (this.gameChecks[y][x].flag || this.gameChecks[y][x].isOpen) return;
    openCheck(x, y);
    if (this.gameChecks[y][x].mine) {
      this.gameState = "lose";
      this.gameChecks.forEach((starts) => {
        starts.forEach((start) => {
          start.isOpen = true;
        });
      });
    }
    this.iswin();
  }
}
