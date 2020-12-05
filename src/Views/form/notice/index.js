import Vue from "vue";
import Notice from "./Notice.vue";

function create(Comp, props) {
  //方式1
  //   const Ctor = Vue.extend(Comp); //返回构造函数
  //   const vm = new Ctor({ propsData: props }); //
  //   vm.$mount();
  //方式2
  const vm = new Vue({
    render(h) {
      //createElement简写
      return h(Comp, { props });
    },
  }).$mount();
  document.body.appendChild(vm.$el);

  console.log(vm.$el);

  // 3.获取组件实例
  const comp = vm.$children[0];
  //Notice调用，定时
  comp.remove = () => {
    document.body.removeChild(vm.$el);
    vm.$destroy();
  };
  return comp;
}

// export default create;
export default {
  install(Vue) {
    console.log(Vue.prototype);
    Vue.prototype.$notice = function(options) {
      return create(Notice, options);
    };
    console.log(Vue);
  },
};
