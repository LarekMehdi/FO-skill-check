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

import { useAuth } from "../composables/useAuth";
import CreateQuestion from "../components/pages/admin/CreateQuestion.vue";
import TagList from "../components/pages/admin/TagList.vue";
import TestList from "../components/pages/test/TestList.vue";
import TestDetails from "../components/pages/test/TestDetails.vue";
import TakeTest from "../components/pages/test/TakeTest.vue";
import TestResult from "../components/pages/test/TestResult.vue";
import Signin from "../components/pages/auth/Signin.vue";
import Signup from "../components/pages/auth/Signup.vue";
import Profil from "../components/pages/auth/user/Profil.vue";
import Error403 from "../components/pages/error/Error403.vue";
import UserList from "../components/pages/auth/user/UserList.vue";
import QuestionList from "../components/pages/admin/QuestionList.vue";
import QuestionDetails from "../components/pages/admin/QuestionDetails.vue";




const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  ///////////// AUTH //////////////////
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
  ///////////// QUESTION ///////////////
  {
    path: "/question",
    name: "questionList",
    component: QuestionList,
    meta: { requiresAdmin: true }
  },
  {
    path: "/question/create",
    name: "questionCreate",
    component: CreateQuestion,
    meta: { requiresAdmin: true }
  },
  {
    path: "/question/:id",
    name: "questionDetails",
    component: QuestionDetails,
    meta: { requiresAdmin: true }
  },
  ///////////// TAG ///////////////////
  {
    path: "/tag",
    name: "tagList",
    component: TagList,
    meta: { requiresAdmin: true }
  },
  ///////////// TEST //////////////////
  {
    path: "/test",
    name: "testList",
    component: TestList,
  },
  {
    path: "/test/:id",
    name: "testDetails",
    component: TestDetails,
  },
  {
    path: "/test/:id/takeTest",
    name: "testTakeTest",
    component: TakeTest,
  },
  {
    path: "/test/:id/result/:sessionId",
    name: "TestResult",
    component: TestResult,
  },
  ///////////// USER ///////////////
  {
    path: "/user/:id",
    name: "UserProfil",
    component: Profil,
    meta: { onlyMe: true }
  },
  {
    path: "/user",
    name: "UserList",
    component: UserList,
    meta: { requiresAdmin: true }
  },
  ///////////// ERROR ///////////////
  {
    path: "/error/403",
    name: "error403",
    component: Error403,
  },
];

const router = createRouter({
  //history: createWebHistory(import.meta.env.VITE_API_URL),
  history: createWebHistory('/'),
  routes,
});

router.beforeEach((to, from, next) => {
  const { isAdmin, userId } = useAuth();
  if (to.meta.requiresAdmin) {
    if (!isAdmin.value) {
      return next({name: 'error403'});
    }
  }
  if (to.meta.onlyMe) {
    const routeId = Array.isArray(to.params.id) ? to.params.id[0] : to.params.id;
    if (!isAdmin.value && String(userId.value) !== String(routeId)) {
      return next({ name: 'error403' });
    }
  }
 
  return next();
});

export default router;