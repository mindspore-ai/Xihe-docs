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
      text: "新版本更新说明",
      link: "/zh/release/",
    },
    {
      text: "Jupyter操作文档",
      link: "/zh/cloud/",
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
        {
          text: "大模型体验文档",
          link: "/zh/basics/big_model_ui/",
        },
      ],
    },
    {
      text: "教程篇",
      children: [
        {
          text: "平台训练教程",
          link: "/zh/tutorial/train/",
        },
        {
          text: "平台推理教程",
          link: "/zh/tutorial/inference/",
        },
        {
          text: "平台评估教程",
          link: "/zh/tutorial/evaluation/",
        },
        {
          text: "平台仓库文件操作教程",
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
          text: "平台协议",
          link: "/zh/appendix/platlicense/",
        },
        {
          text: "用户协议",
          link: "/zh/appendix/userlicense/",
        },
      ],
    },
  ],
};
