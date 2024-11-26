module.exports = {
  title: "gegeの",
  description: "gege",
  base: "/myBlog/",
  themeConfig: {
    logo: "/assets/img/ava.png",
    nav: [
      { text: "Home", link: "/" },
      { text: "javascript", link: "/javascript/" },
      { text: "css", link: "/css/" },
      { text: "react", link: "/react/" },
      { text: "vue", link: "/vue/" },
      { text: "html", link: "/html/" },
      { text: "git", link: "/git/" },
      { text: "webpack", link: "/webpack/" },
    ],
    //sidebar: ["/", "/javascript/", "/css/", "/react/", "/vue/"],
    // sidebar: [
    //   {
    //     collapsable: false,
    //     title: "javascript",
    //     children: ["/javascript/"],
    //   },
    //   {
    //     title: "react",
    //     children: ["/react/"],
    //   },
    //   {
    //     title: "css",
    //     children: ["/css/"],
    //   },
    //   {
    //     title: "vue",
    //     children: ["/vue/"],
    //   },
    // ],
    sidebar: {
      "/javascript/": [
        {
          title: "javascript",
          collapsable: false,
          children: [
            { title: "工具方法", path: "/javascript/methods" },
            { title: "Es6系列", path: "/javascript/Es6" },
            {
              title: "复写方法",
              path: "/javascript/rewrite",
            },
            {
              title: "面试题",
              path: "/javascript/topic",
            },
            {
              title: "内置api",
              path: "/javascript/api",
            },
            {
              title: "http",
              path: "/javascript/http",
            },
          ],
        },
      ],
      "/css/": [
        {
          title: "css",
          children: [
            { title: "css", path: "/css/css" },
            { title: "动画", path: "/css/animate" },
          ],
        },
      ],
      "/react/": [
        {
          title: "react",
          children: [
            { title: "hooks", path: "/react/hooks.md" },
            { title: "文档", path: "/react/file.md" },
          ],
        },
      ],
      "/vue/": [
        {
          title: "vue",
          children: [
            { title: "事件", path: "/vue/methods" },
            { title: "原理", path: "/vue/underlying" },
            { title: "v3", path: "/vue/v3.md" },
          ],
        },
      ],
      "/html/": [
        {
          title: "html",
          children: [{ title: "问题", path: "/html/html" }],
        },
      ],
      "/git/": [
        {
          title: "git",
          children: [{ title: "命令", path: "/git/git" }],
        },
      ],
      "/webpack/": [
        {
          title: "mmmm",
          children: [{ title: "webpack", path: "/webpack/webpack" }],
        },
      ],
    },
  },
};
