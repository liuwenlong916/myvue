<<<<<<< HEAD
<template>
  <div>
    <input :type="type" :value="value" @input="onInput" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
  },
  methods: {
    onInput(e) {
      //v-model='text' => :value='text' @input='text=$event.target.value'
      //调用父节点的input事件，传入参数。
      this.$emit("input", e.target.value);
      this.$parent.$emit("validate");
    },
  },
};
</script>

<style lang="scss" scoped></style>
