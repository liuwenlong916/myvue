export default class ObServer {
  constructor(val) {
    this.value = val;
    this.walk(val);
  }
  walk() {}
}
