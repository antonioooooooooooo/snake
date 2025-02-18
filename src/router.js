import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import GameBoard from "./components/GameBoard.vue";

const routes = [
  { path: "/snake", name: "Home", component: Home },
  { path: "/snake/game", name: "Game", component: GameBoard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
