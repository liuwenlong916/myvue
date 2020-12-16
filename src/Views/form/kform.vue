<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      form: this,
    };
  },
  props: {
    models: {
      type: Object,
      require: true,
    },
    rules: Object,
  },
  data() {
    return {};
  },
  methods: {
    validate(cb) {
      const tasks = this.$children
        .filter((item) => item.prop)
        .map((item) => item.validate());
      Promise.all(tasks)
        .then(() => {
          cb(true);
        })
        .catch(() => {
          cb(false);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
