<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    validate(cb) {
      const list = this.$children.filter((item) => item.prop);
      const tasks = list.map((item) => item.validate());
      //foreach没有返回值。
      //   const tasks = list.forEach((item) => {
      //     return item.validate();
      //   });
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
