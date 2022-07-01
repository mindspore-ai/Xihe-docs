export default {
  sidebar: [
    {
      text: "简介",
      link: "/zh/introduction/",
    },
    {
      text: "快速上手",
      link: "/zh/quick_start/",
    },
    {
      text: "入门篇",
      children: [
        {
          text: "用户操作文档",
          link: "/zh/basics/user_ui/",
        },
        {
          text: "模型操作文档",
          link: "/zh/basics/model_ui/",
        },
        {
          text: "数据集操作文档",
          link: "/zh/basics/dataset_ui/",
        },
        {
          text: "项目操作文档",
          link: "/zh/basics/project_ui/",
        },
      ],
    },
    {
      text: "常见问题解答",
      link: "/zh/FAQ/",
    },
    {
      text: "附录",
      children: [
        {
          text: "最佳实践",
          link: "/zh/appendix/recipes/",
        },
        {
          text: "版本说明",
          link: "/zh/appendix/changelog/",
        },
        {
          text: "反馈方式",
          link: "/zh/appendix/feedback/",
        },
        {
          text: "使用协议",
          link: "/zh/appendix/license/",
        },
      ],
    },
  ],
};
