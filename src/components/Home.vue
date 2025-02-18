<template>
  <div class="homepage-wrapper">
    <h1 class="homepage-heading">Welcome to Anton's Snake</h1>
    <h2 class="homepage-sub-heading">Press any arrow key to begin</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    init() {
      document.addEventListener("keydown", this.onKeyDown.bind(this));
    },
    beginGame() {
      this.$router.push("game").then(() => {
        document.removeEventListener("keydown", this.onKeyDown);
      });
    },
    onKeyDown(e) {
      console.log("im hereeee");
      if (
        e.keyCode === 37 ||
        e.keyCode === 38 ||
        e.keyCode === 39 ||
        e.keyCode === 40
      ) {
        this.beginGame();
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
.homepage-wrapper {
  background-color: #faaca8;
  background-image: linear-gradient(19deg, #faaca8 0%, #ddd6f3 100%);
  width: 100%;
  height: 100%;
  padding-top: 15%;
  user-select: none;
}
.homepage-heading {
  margin: 0;
  font-family: "Open Sans";
  color: #1f1f1f;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 2px;
  text-align: center;
  font-size: 50px;
}
.homepage-sub-heading {
  margin: 60px 0 00;
  font-family: "Open Sans";
  color: #1f1f1f;
  text-align: center;
}
</style>
