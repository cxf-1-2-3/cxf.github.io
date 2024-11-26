<template>
  <div class="_base-count-down">
    <slot
      v-bind="{
        d: days,
        h: hours,
        m: mins,
        s: seconds,
        hh: `00${hours}`.slice(-2),
        mm: `00${mins}`.slice(-2),
        ss: `00${seconds}`.slice(-2),
      }"
    ></slot>
    {{ days }}天{{ `00${hours}`.slice(-2) }}小时{{
      `00${mins}`.slice(-2)
    }}分钟{{ `00${seconds}`.slice(-2) }}秒
  </div>
</template>
<script>
export default {
  data: () => ({
    days: "0",
    hours: "00",
    mins: "00",
    seconds: "00",
    timer: null,
    curTime: 0, // 新增代码：
  }),
  props: {
    time: {
      type: [Number, String],
      default: 3600,
    },
    isMilliSecond: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    duration() {
      // if (this.end) {
      //   let end = String(this.end).length >= 13 ? +this.end : +this.end * 1000;
      //   end -= Date.now();
      //   return end;
      // }
      //根据时间是秒还是毫秒 统一转换为秒
      const time = this.isMilliSecond
        ? Math.round(+this.time / 1000)
        : Math.round(+this.time);
      return time;
    },
  },
  mounted() {
    this.countDown();
  },
  // watch: {
  //   duration() {
  //     this.countDown();
  //   },
  // },
  methods: {
    countDown() {
      this.curTime = Date.now();
      this.getTime(this.duration);
    },
    getTime(duration) {
      this.timer && clearTimeout(this.timer);
      if (duration < 0) {
        return;
      }
      const { dd, hh, mm, ss } = this.durationFormatter(duration);
      this.days = dd || 0;
      this.hours = hh || 0;
      this.mins = mm || 0;
      this.seconds = ss || 0;
      this.timer = setTimeout(() => {
        // 新增代码：
        const now = Date.now();
        const diffTime = Math.floor((now - this.curTime) / 1000);
        this.curTime = now;
        this.getTime(duration - diffTime);
      }, 1000);
    },
    durationFormatter(time) {
      if (!time) return { ss: 0 };
      let t = time;
      //获取秒
      const ss = t % 60;
      // 100 % 60 = 40
      //100-40 /60 = 1
      t = (t - ss) / 60;
      // 如果分钟 小于1 返回秒数
      if (t < 1) return { ss };

      //分钟数大于1 计算
      const mm = t % 60;
      t = (t - mm) / 60;
      if (t < 1) return { mm, ss };

      const hh = t % 24;
      t = (t - hh) / 24;
      if (t < 1) return { hh, mm, ss };
      const dd = t;
      return { dd, hh, mm, ss };
    },
  },
};
</script>

<style lang="scss" scoped></style>
