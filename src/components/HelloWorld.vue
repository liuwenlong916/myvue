<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <formExp></formExp>
  </div>
</template>

<script>
import formExp from "./form";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    formExp,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
