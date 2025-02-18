<template>
  <div id="board-wrapper">
    <canvas id="board" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      game: {},
      canvas: {
        width: window.innerWidth,
        height: window.innerHeight,
        context: null,
        fillStyle: "#2c3e50",
        gridSize: 40,
      },
      snake: {
        posX: 0,
        posY: 0,
        size: 1,
        speed: 8,
        queue: [],
        fillStyle: "#2ecc71",
      },
      target: {
        posX: 0,
        posY: 0,
        fillStyle: "brown",
      },
      velocity: {
        x: 1,
        y: 0,
      },
      gameOver: false,
      timer: null,
    };
  },
  methods: {
    init() {
      this.game.width = this.canvas.width;
      this.game.height = this.canvas.height;
      this.canvas.context = this.game.getContext("2d");
      this.snake.posX =
        Math.round(this.canvas.width / this.canvas.gridSize / 2) - 1;
      this.snake.posY = Math.round(
        this.canvas.height / this.canvas.gridSize / 2
      );
      this.target.posX =
        Math.round(this.canvas.width / this.canvas.gridSize / 3) - 1;
      this.target.posY = Math.round(
        this.canvas.height / this.canvas.gridSize / 4
      );

      document.addEventListener("keydown", this.onKeyDown.bind(this));
      this.timerMethod();
    },
    timerMethod() {
      this.timer = setInterval(this.loop, 1000 / this.snake.speed);
    },
    loop() {
      this.timeLoopStatus = true;
      this.calc();
      this.draw();
    },
    calc() {
      this.snake.posX += this.velocity.x;
      this.snake.posY += this.velocity.y;

      if (
        this.snake.posX < 0 ||
        this.snake.posY < 0 ||
        this.snake.posX >=
          Math.round(this.canvas.width / this.canvas.gridSize) ||
        this.snake.posY >= Math.round(this.canvas.height / this.canvas.gridSize)
      ) {
        clearInterval(this.timer);
        alert("You lost!");
        this.gameOver = true;
        return;
      }

      this.snake.queue.forEach((elem) => {
        if (this.snake.posX === elem.posX && this.snake.posY === elem.posY) {
          clearInterval(this.timer);
          this.gameOver = true;
          alert("You lost!");
        }
      });

      this.snake.queue.push({
        posX: this.snake.posX,
        posY: this.snake.posY,
      });

      while (this.snake.queue.length > this.snake.size) {
        this.snake.queue.shift();
      }

      if (
        this.snake.posX === this.target.posX &&
        this.snake.posY === this.target.posY
      ) {
        this.snake.size++;
        this.snake.speed++;

        let isInvalidNewLocation = true;

        while (isInvalidNewLocation) {
          this.target.posX = Math.abs(
            Math.round(
              Math.round(Math.random() * this.canvas.width) /
                this.canvas.gridSize -
                1
            )
          );
          this.target.posY = Math.abs(
            Math.round(
              Math.round(Math.random() * this.canvas.height) /
                this.canvas.gridSize -
                1
            )
          );

          isInvalidNewLocation = false;

          this.snake.queue.forEach((elem) => {
            if (
              elem.posX === this.target.posX &&
              elem.posY === this.target.posY
            ) {
              isInvalidNewLocation = true;
            }
          });
        }

        console.log(this.target.posX);
        console.log(this.target.posY);
      }
    },
    draw() {
      let gradient = this.canvas.context.createLinearGradient(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      gradient.addColorStop(0, "#FAACA8");
      gradient.addColorStop(1, "#DDD6F3");

      this.canvas.context.fillStyle = gradient;
      this.canvas.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      if (this.gameOver) {
        this.canvas.context.fillStyle = "rgba(255, 255, 255, 0.2)";
        this.canvas.context.font = this.canvas.width / 10 + "px Open Sans";
        this.canvas.context.fillText(
          "GAME OVER",
          this.canvas.width / 4,
          this.canvas.height / 3.5
        );
      }

      let lineWidth = 1;
      this.snake.queue.forEach((elem, idx) => {
        if (idx === this.snake.queue.length - 1) {
          this.canvas.context.fillStyle = "#c0392b";
          this.canvas.context.strokeStyle = "#ecf0f1";
          this.canvas.context.lineWidth = lineWidth + 5;
          this.canvas.context.strokeRect(
            elem.posX * this.canvas.gridSize,
            elem.posY * this.canvas.gridSize,
            this.canvas.gridSize - 2,
            this.canvas.gridSize - 2
          );
        } else {
          this.canvas.context.fillStyle = this.snake.fillStyle;
          this.canvas.context.strokeStyle = "#ecf0f1";
          this.canvas.context.lineWidth = lineWidth;
          lineWidth += 0.3;
          this.canvas.context.strokeRect(
            elem.posX * this.canvas.gridSize,
            elem.posY * this.canvas.gridSize,
            this.canvas.gridSize - 2,
            this.canvas.gridSize - 2
          );
        }

        this.canvas.context.fillStyle = this.target.fillStyle;
        this.canvas.context.fillRect(
          this.target.posX * this.canvas.gridSize,
          this.target.posY * this.canvas.gridSize,
          this.canvas.gridSize,
          this.canvas.gridSize
        );

        this.canvas.context.fillStyle = "rgba(255, 255, 255, 0.2)";
        this.canvas.font = this.canvas.width / 10 + "px Open Sans";
        this.canvas.context.fillText(
          "SCORE : " + parseInt(this.snake.size - 1),
          this.canvas.width / 3.2,
          this.canvas.height / 1.9
        );
      });
    },
    onKeyDown(e) {
      if (e.keyCode === 37) {
        this.velocity.x = -1;
        this.velocity.y = 0;
      } else if (e.keyCode === 38) {
        this.velocity.x = 0;
        this.velocity.y = -1;
      } else if (e.keyCode === 39) {
        this.velocity.x = 1;
        this.velocity.y = 0;
      } else if (e.keyCode === 40) {
        this.velocity.x = 0;
        this.velocity.y = 1;
      }
    },
  },
  mounted() {
    this.game = document.getElementById("board");
    this.init();
  },
  watch: {
    "snake.speed": {
      deep: true,
      handler() {
        clearInterval(this.timer);
        this.timerMethod();
      },
    },
  },
};
</script>

<style scoped>
#board-wrapper {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  animation-duration: 1.5s;
  background-color: #faaca8;
  background-image: linear-gradient(19deg, #faaca8 0%, #ddd6f3 100%);
}
</style>
