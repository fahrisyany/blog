import Vue from "vue";
import Router from "vue-router";
// import Login from "./views/Login.vue";
import Account from "./views/Account.vue";
import Register from "./views/Register.vue";
import CreateArticle from "./views/CreateArticle.vue";
import ArticleForm from "./components/ArticleForm.vue";
import myArticleList from "./components/myArticleList.vue";
import Tile from "./components/Tile.vue";
import Login from "./components/LoginForm.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () => import("./views/Home.vue"),
      children: [
        {
          path: "/",
          component: Tile
        },
        {
          path: "/:articleId",
          component: ArticleForm
        },
 
      ]
    },

    {
      path: "/login",
      name: "login",

      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },

    {
      path: "/createArticle",
      name: "createArticle",
      component: CreateArticle
    },
    {
      path: "/account/:username",
      component: Account,
      children: [
        {
          path: "/",
          name:"account",
          component: myArticleList
        },
      ]
    }
  ]
});
