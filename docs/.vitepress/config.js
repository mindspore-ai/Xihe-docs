import path from "path";
import dirTree from "directory-tree";
const sidebar = dirTree(path.resolve(__dirname, "../zh")).children;
const list = [];
function sidebarList(array) {
  array.forEach((item) => {
    list.push({ text: item.name, items: item.children });
  });
  list.forEach((item) => {
    item.items.forEach((itemChildren, index) => {
      if (itemChildren.type !== "directory") {
        item.items.splice(index, 1);
      }
    });
  });

}
sidebarList(sidebar);
module.exports = {
  base: "/",
  title: "MindSpore",
  description: "MindSpore DOCS",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
    [
      "meta",
      {
        name: "keywords",
        content: "data engine,big data,distributed,reliable,low latency",
      },
    ],
  ],
  themeConfig: {
    sidebar: list,
  },
  locales: {
    "/": {
      lang: "zh",
      label: "中文",
      title: "MindSpore",
      description: "",
    },
  },
  markdown: {
    theme: 'material-palenight',
    lineNumbers: true
  },
  dest: "./dist",
};
