import Vue from "vue";
// import VueRouter from "vue-router";
import VueRouter from "../Plugins/kvue-router/kvue-router"; //TODO重定向没有更新
import Home from "../Views/Home";
import Detail from "../Views/Detail";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/Home" },
  { path: "/Home", component: Home },
  { path: "/Detail", name: "Detail", component: Detail },
];

const router = new VueRouter({
  routes,
});

export default router;
