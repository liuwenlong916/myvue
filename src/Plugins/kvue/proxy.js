function proxy(vm, key) {
  Object.keys(vm[key]).forEach((k) => {
    // vm[k] = vm[key][k];
    //闭包
    Object.defineProperty(vm, k, {
      get() {
        return vm[key][k];
      },
      set(newVal) {
        vm[key][k] = newVal;
      },
    });
  });
}
// export default proxy
