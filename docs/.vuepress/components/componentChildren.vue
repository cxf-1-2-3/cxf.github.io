<template>
  <div id="">
    <div>{{ title }}</div>
    <button @click="changeTitle">修改父组件的值</button>
    <div>{{ value }}</div>
    <button @click="changeTitle1">修改父组件的值1</button>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    value: {
      type: String,
    },
  },
  methods: {
    changeTitle() {
      this.$emit("update:title", "子组件的值");
    },
    changeTitle1() {
      this.$emit("input", "子组件的值1");
    },
  },
};
</script>

<style lang="scss" scoped></style>
