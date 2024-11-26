<template>
  <div id="">
    <h1 class="hover-underline-animation">Hover this text to see the effect</h1>
    <div class="spotlight-wrap">
      <h3 title="hello world" class="spotlight">hello world</h3>
    </div>
  </div>
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
</script>

<style scoped>
.hover-underline-animation {
  color: #0087ca;
  cursor: pointer;
  display: inline-block;
  position: relative;
}
.hover-underline-animation::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  left: 0;
  bottom: 0;
  background-color: #0087ca;
  transform: scaleX(0);
  transition: transform 0.5s ease-out;
  transform-origin: right;
}
.hover-underline-animation:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.spotlight-wrap {
  background-color: #3c3c3c;
  text-align: center;
}
.spotlight {
  display: inline-block;
  position: relative;
  font-size: 48px;
}
.spotlight::after {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  content: attr(title);
  color: #fff;
  animation: spotlight 3s ease-in-out infinite alternate;
}
@keyframes spotlight {
  0% {
    clip-path: ellipse(32px 32px at 0% 50%);
  }
  100% {
    clip-path: ellipse(32px 32px at 100% 50%);
  }
}
</style>
