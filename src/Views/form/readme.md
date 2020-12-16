# 1.kinput 双绑实现(v-model):

```javascript
props:{
    value:String
}
    :value='value' @input='this.$emit('input',$event.target.value)'
```

# 2.kitem 校验

    实现校验方法，$on监听， input输入this.$parent.$emit调用，
    validator.valitate返回一个promise。

# 3.kform 整体校验

    循环$children，执行校验，接受promise，执行Promise.all，校验所有是否正确，执行index回调方法。

# 4.index 登陆校验

    调用form校验方法传入回调。

# 5. notice 弹框

    1.弹框 Notice.vue
    2.显示弹框index.js

# 6.待优化

    1.使用$parent $children耦合。
