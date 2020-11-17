<template>
  <div>
    {{ name }}
    <formExp></formExp>
  </div>
</template>

<script>
import formExp from "./form/index";
export default {
  data() {
    return {
      name: "detail",
    };
  },
  components: {
    formExp,
  },
};
</script>

<style lang="scss" scoped></style>
