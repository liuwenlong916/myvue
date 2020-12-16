<template>
  <div>
    home
    {{ name }}
    <router-link to="/Home/About">About</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "home",
    };
  },
};
</script>

<style lang="scss" scoped></style>
