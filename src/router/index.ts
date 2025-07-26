/*/const express = require("express");
const app = express();
const port = 3000;

app.get("/hello", (req, resp) => {
  return resp.send("General Kenobi");
});

app.listen(port, () => {
  console.log("exemple app listening at http:localhost:${port}");
});*/

import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
//   {
//     path: "/login",
//     name: "login",
//     component: LoginView,
//   },
  
  //{
  //path: "/about",
  //name: "about",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  //component: () =>
  //import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  //},
];

const router = createRouter({
  //history: createWebHistory(import.meta.env.VITE_API_URL),
  history: createWebHistory('/'),
  routes,
});

export default router;