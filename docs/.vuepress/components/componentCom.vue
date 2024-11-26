<template>
  <div id="">
    <componentChildren
      :title.sync="title"
      v-model="title1"
      @click.native="comClick"
    ></componentChildren>
  </div>
</template>

<script>
import componentChildren from "./componentChildren.vue";
export default {
  components: {
    componentChildren,
  },
  data() {
    return {
      title1: "父组件的值1",
      title: "父组件的值",
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    comClick() {
      console.log("1111");
    },
  },
};
</script>

<style lang="scss" scoped></style>
