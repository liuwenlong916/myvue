import Vue from "vue";
// import VueRouter from "vue-router";
import VueRouter from "../Plugins/kvue-router/kvue-router"; //TODO重定向没有更新
import Home from "../Views/Home";
import Detail from "../Views/Detail";
import About from "../Views/About";
import Test from "../Views/Test";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/Home" },
  {
    path: "/Home",
    component: Home,
    children: [
      {
        path: "/Home/About",
        //TODO :render函数？
        // component: Vue.component("About", {
        //   render(h) {
        //     return h("div", "About");
        //   },
        // }),
        component: About,
        children: [
          {
            path: "/Home/About/Test",
            component: Test,
          },
        ],
      },
    ],
  },
  { path: "/Detail", name: "Detail", component: Detail },
];

const router = new VueRouter({
  routes,
});

export default router;
