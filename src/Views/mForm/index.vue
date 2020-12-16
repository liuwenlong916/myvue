<template>
  <div>
    <m-form :models="models" :rules="rules" ref="myform">
      <m-item label="账号" prop="username">
        <m-input v-model="models.username"></m-input>
      </m-item>
      <m-item label="密码" prop="password">
        <m-input type="password" v-model="models.password"></m-input>
      </m-item>
      <m-item>
        <button @click="onLogin">提交</button>
      </m-item>
    </m-form>

    <p>{{ models.username }}</p>
  </div>
</template>

<script>
import Vue from "vue";
import mInput from "./minput";
import mItem from "./mitem";
import mForm from "./mform";
import create from "./notice/index";
export default {
  mounted() {
    console.log(this);
  },
  provide() {
    return {
      form: this,
    };
  },
  data() {
    return {
      models: {
        username: "tom",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "输入用户名" }],
        password: [{ required: true, message: "输入密码" }],
      },
    };
  },
  components: {
    mInput,
    mItem,
    mForm,
  },
  methods: {
    onLogin() {
      this.$refs.myform.validate((isValid) => {
        // if (isValid) {
        //   console.log("登陆成功");
        // } else {
        //   alert("isValid");
        // }
        create.install(Vue);
        this.$Notice({
          title: "标题",
          message: isValid ? "成功" : "失败",
        }).show();
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
