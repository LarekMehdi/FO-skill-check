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
import Home from "../components/pages/Home.vue";
import Signin from "../components/pages/Signin.vue";
import Signup from "../components/pages/Signup.vue";
import { useAuth } from "../composables/useAuth";
import CreateQuestion from "../components/pages/admin/CreateQuestion.vue";
import TagList from "../components/pages/admin/TagList.vue";


const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/signin",
    name: "signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/question/create",
    name: "questionCreate",
    component: CreateQuestion,
    meta: { requiresAdmin: true }
  },
  {
    path: "/tag",
    name: "tagList",
    component: TagList,
    meta: { requiresAdmin: true }
  },
  
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

router.beforeEach((to, from, next) => {
  const { isAdmin } = useAuth();
  if (to.meta.requiresAdmin) {
    if (!isAdmin.value) {
      // TODO: page 403
      return next({name: 'home'});
    }
  }
 
  return next();
});

export default router;