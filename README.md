# myvue

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# vue 实现一个绩效管理系统

## 一、人员

    1.管理员
    2.普通员工
    3.领导(分级领导)
    4.部门HR(监督考核进度，结束考核，当前部门人员管理)

## 二、考核流程

## 三、菜单权限控制

## 四、人员管理

## 五、数据结构

    1.人员表(员工号，姓名，登陆名，联系方式，部门ID)
    2.部门表(部门名称，部门级别，父级部门)(扁平化管理，考虑部门只有两级)
    3.绩效表(绩效名称，绩效年份，部门ID(可多个，分号(;)隔开))
    4.权限表(权限类型，包含url内容...)
    5.员工考核项表(考核ID,员工ID,部门ID,考核内容,考核完成度)
    6.打分表(考核项表ID,得分,打分人...)

    .配置表
