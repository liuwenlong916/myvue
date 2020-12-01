export default function Proxy(vm, key) {
  Object.key(vm[key]).forEach(k => {
    // vm[k] = vm[key][k];
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
