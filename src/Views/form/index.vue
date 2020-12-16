<template>
  <div>
    <kform :models="models" :rules="rules" ref="myform">
      <kitem label="用户名" prop="username">
        <kinput v-model="models.username"></kinput>
        <!-- <kinput :value="models.username" @input="onInput"></kinput> -->
      </kitem>
      <kitem label="密码" prop="password">
        <kinput type="password" v-model="models.password"></kinput>
      </kitem>
      <kitem>
        <button @click="onLogin">登陆</button>
      </kitem>
    </kform>
  </div>
</template>

<script>
import kform from "./kform";
import kitem from "./kitem";
import kinput from "./kinput";
import create from "./notice/index";
import Vue from "vue";
// import Notice from "./notice/Notice";

export default {
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
  methods: {
    onLogin() {
      this.$refs.myform.validate((isValid) => {
        // create(Notice, {
        //   title: "标题",
        //   message: isValid ? "成功" : "失败",
        // }).show();
        create.install(Vue);
        this.$notice({
          title: "标题",
          message: isValid ? "sussecc" : "faild",
        }).show();
        // if (isValid) {
        //   //   console.log("登陆成功");
        //   //   notice.install(this);
        //   //   this.$notice({ title: "成功", message: "登陆成功" });
        // } else {
        //   console.log("登陆失败");
        // }
      });
    },

    // onInput(val) {
    //   this.models.username = val;
    // },
  },
  components: {
    kinput,
    kitem,
    kform,
  },
};
</script>

<style lang="scss" scoped></style>
