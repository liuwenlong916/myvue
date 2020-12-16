<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <p class="err">{{ error }}</p>
  </div>
</template>

<script>
import Validator from "async-validator";
export default {
  mounted() {
    this.$on("validate", () => {
      this.validate();
    });
  },
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      error: "",
    };
  },
  methods: {
    validate() {
      const rule = this.form.rules[this.prop];
      const value = this.form.models[this.prop];
      const validator = new Validator({ [this.prop]: rule });
      //返回一个promise
      return validator.validate({ [this.prop]: value }, (errors) => {
        if (errors) {
          this.error = errors[0].message;
        } else {
          this.error = "";
        }
      });
    },
  },
};
</script>

<style>
.err {
  color: red;
}
</style>
