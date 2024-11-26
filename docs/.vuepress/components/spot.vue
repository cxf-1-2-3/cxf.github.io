<template>
  <div class="spot" ref="spot" @mousemove="move">
    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      canvasDom: "",
      caWidth: "",
      caHeight: "",
      ctx: "",
      vx: "",
      vy: "",
      arrayList: [],
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.canvasDom = this.$refs.canvas;
    this.caWidth = this.$refs.spot.clientWidth;
    this.caHeight = this.$refs.spot.clientHeight;
    this.init();
  },
  methods: {
    init() {
      this.ctx = this.canvasDom.getContext("2d");
      this.canvasDom.width = this.caWidth;
      this.canvasDom.height = this.caHeight;
      this.main();
    },
    main() {
      let ctx = this.ctx;
      ctx.clearRect(0, 0, this.caWidth, this.caHeight);
      this.arrayList.forEach((item) => {
        ctx.beginPath();
        ctx.arc(item.x, item.y, item.r, 0, Math.PI * 2);
        ctx.fillStyle = `#${item.color}`;
        ctx.fill();
        item.update();
      });
      requestAnimationFrame(this.main); //递归调用 不需要传入时间 根据浏览器刷新率调用
    },
    random(max, min) {
      return (max - min) * Math.random() + min;
    },
    move(e) {
      this.create(e.clientX - 130, e.clientY - 70);
    },
    create(x, y) {
      this.vx = this.random(5, -5);
      this.vy = this.random(5, -5);
      let color = Math.floor(Math.random() * 1000000);
      this.arrayList.push(new Ball(x, y, this.vx, this.vy, color));
    },
  },
};
//  创建球形对象
class Ball {
  r = 5;
  constructor(x, y, vx, vy, c) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = c;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
  }
}
</script>

<style scoped>
.spot {
  position: fixed;
  left: 150px;
  width: calc(100% - 150px);
  height: 89vh;
  background-color: #000;
  z-index: 1111;
}
.canvas {
  /* width: 100%;
  height: 100%; */
}
</style>
