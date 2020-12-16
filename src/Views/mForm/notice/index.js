import Vue from "vue";
import Notice from "./Notice.vue";
function create(comp, props) {
  //方式1
  //   const Ctor = Vue.extend(Comp); //返回构造函数
  //   const vm = new Ctor({ propsData: props }); //
  //   vm.$mount();
  //复习第二节课开始内容
  //vue实例
  const vm = new Vue({
    render(h) {
      return h(comp, { props });
    },
  }).$mount();
  document.body.appendChild(vm.$el);

  //区分组件实例和vue实例
  const com = vm.$children[0]; //组件实例
  com.remove = () => {
    document.body.removeChild(vm.$el);
    vm.$destroy();
  };
  return com;
}
export default {
  install(Vue) {
    Vue.prototype.$Notice = function(options) {
      return create(Notice, options);
    };
  },
};
