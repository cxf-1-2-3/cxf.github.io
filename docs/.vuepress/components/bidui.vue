<template>
  <div id="">
    <div>
      黑山名誉总统武亚诺维奇、中国驻黑山大使范琨、黑山资本投资部国务秘书沙赫马诺维奇、黑山前驻华大使帕约维奇等政要、专家学者、媒体代表及青年学生共200余人参会
    </div>
    <div v-html="newData"></div>
  </div>
</template>

<script>
export default {
  components: {},
  //1 增加 2删除 3正常
  data() {
    return {
      list: [
        {
          h2: {
            test: "项目背景",
            content:
              "黑山名誉总统武亚诺维奇、中国驻黑山大使范琨、黑山资本投资部国务秘书沙赫马诺维奇、黑山前驻华大使帕约维奇等政要、专家学者、媒体代表及青年学生共200余人参会",
          },
          config: [
            {
              type: 1,
              s: 5,
              msg: "好孩子",
            },
            {
              type: 1,
              s: 10,
              msg: "快速发展",
            },
            {
              type: 2,
              s: 12,
              e: 21,
              msg: "ddd",
            },
            {
              type: 2,
              s: 59,
              e: 60,
              msg: "现代化进程的推进",
            },
          ],
        },
        {
          h2: {
            test: "项目背景",
            content:
              "随着国民经济的快速发展和现代化进程的推进随着国民经济的快速发展和现代化进程的推进随着国民经济的快速发展和现代化进程的推进",
          },
          config: [
            {
              type: 1,
              s: 5,
              msg: "好孩1子",
            },
            {
              type: 1,
              s: 13,
              msg: "好孩1子啊",
            },
            {
              type: 2,
              s: 0,
              e: 2,
              msg: "随着",
            },
          ],
        },
      ],
      newData: "",
      html: "",
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.path(this.list);
  },
  methods: {
    /* 标注的成带有不同颜色。最直接的是通过添加背景色。 也就是需要给对应的文字包裹一层标签 加上背景色实现
     */
    path(list) {
      //遍历后台返回的数据
      this.list.forEach((item) => {
        let content = item.h2.content.split("");
        let newDatas = {};
        //生成标题  采用h2标签
        if (item.h2) {
          this.newData += `<h2>${item.h2.test}</h2>`;
        }
        //遍历每条文案的配置 1代表添加  只需要在开始位置追加内容  2 代表删除  要获取到开始位置和结束位置
        // 通过数组对象   对每一条规则进行保存。一个对象代表一条规则。每个对象的key 用配置的开始活着结束位置。值为对应的内容。
        item.config.forEach((i) => {
          if (i.type == 1) {
            newDatas[
              i.s
            ] = `<span style="background-color:#3eaf7c">${i.msg}</span>`;
          }
          if (i.type == 2) {
            newDatas[
              i.s + " - " + i.e
            ] = `<span style="background-color:#999">${i.msg}</span>`;
          }
        });
        //遍历  组合好的通过配置   生成的数据
        for (let i in newDatas) {
          //对key 进行截取 并转为数组  用数组的长度 来判断 是那种类型的配置
          let type = i.split("-");
          //存在  则是有开始和中指操作  没有则是添加
          if (type[1]) {
            let index = Number(type[0]);
            //将对应的下表位置 替换为 带标签背景色 的内容
            content[index] = newDatas[i];
            //循环删除开始位置和截止位置的元素  因为上一步 已经整体替换了  这个文案就不需要了
            for (let i = index + 1; i < Number(type[1]); i++) {
              content[i] = undefined;
            }
          } else {
            //添加的文案 直接找到对应的下标位置进行添加  同时保存当前下表的文案
            content[i] = newDatas[i] + content[i];
          }
        }
        this.newData += content.join("");
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
