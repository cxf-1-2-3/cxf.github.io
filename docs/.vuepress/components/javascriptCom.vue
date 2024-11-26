<template>
  <div id=""></div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
let obj = { a: 1, b: 2 };
function shallowClone(source) {
  let target = {};
  for (let i in source) {
    if (source.hasOwnProperty(i)) {
      target[i] = source[i];
    }
  }
  return target;
}
let shallowCloneObj = shallowClone(obj);
console.log(shallowCloneObj);
</script>

<style lang="scss" scoped></style>
