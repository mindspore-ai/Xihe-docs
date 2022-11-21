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
      text: "操作篇",
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
      text: "教程篇",
      children: [
        {
          text: "训练常见问题",
          link: "/zh/tutorial/train/",
        },
        {
          text: "推理常见问题",
          link: "/zh/tutorial/inference/",
        },
        {
          text: "评估常见问题",
          link: "/zh/tutorial/evaluation/",
        },
        {
          text: "仓库常见问题",
          link: "/zh/tutorial/repo/",
        },
      ],
    },
    {
      text: "案例篇",
      children: [
        {
          text: "基于Lenet的手写数字体识别",
          link: "/zh/examples/Lenet5/",
        },
        {
          text: "基于ResNet50的图片分类任务",
          link: "/zh/examples/Resnet50/",
        },
        {
          text: "基于LSTM的文本情感分类任务教程",
          link: "/zh/examples/LSTM/",
        },
        {
          text: "基于CycleGAN的艺术家画作风格迁移",
          link: "/zh/examples/CycleGAN/",
        },
      ],
    },
    {
      text: "附录",
      children: [
        {
          text: "反馈方式",
          link: "/zh/appendix/feedback/",
        },
        {
          text: "用户协议",
          link: "/zh/appendix/license/",
        },
      ],
    },
  ],
};
