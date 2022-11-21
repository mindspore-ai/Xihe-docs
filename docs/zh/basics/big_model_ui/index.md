[[toc]]

# 大模型体验

更新时间：2022-11-15

## 页面概览

大模型：可以在线体验预训练超大模型任务。

下图页面即大模型大厅页，目前已经上线的大模型有CodeGeeX、紫东.太初、武大.LuoJia、鹏程.盘古；后续还会陆续上线鹏程.神农、鹏程.大圣等大模型的体验，敬请期待。

![image-20221114154809823](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E5%A4%A7%E6%A8%A1%E5%9E%8B/image-20221114154809823.png)

## [CodeGeeX](https://xihe.mindspore.cn/modelzoo/codegeex)

CodeGeeX是一个具有130亿参数的多编程语言代码生成预训练模型，采用华为MindSpore框架实现，在鹏城实验室“鹏城云脑II”上使用1536个国产昇腾910 AI处理器训练而成。CodeGeeX支持十多种主流编程语言的高精度代码生成、跨语言代码翻译等功能，同时开发自动编程插件，更好的辅助程序开发和相关研究。

点击CodeGeeX大模型卡片

![image-20221114161201620](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E5%A4%A7%E6%A8%A1%E5%9E%8B/image-20221114161201620.png)

点击Generate Code按钮，可以自动补全代码。

![11112c01f50bb94f381f7dbab2c9d.png](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E5%A4%A7%E6%A8%A1%E5%9E%8B/image-20221114161038912.png)

生成后的代码效果展示

![image-20221114161722403](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E5%A4%A7%E6%A8%A1%E5%9E%8B/image-20221114161611021.png)

## [紫东.太初](https://xihe.mindspore.cn/modelzoo/taichu)

OPT（Omni-Perception Pre-Trainer）是全场景感知预训练模型的简称，是中科院自动化和华为在探索通用人工智能道路上的重要成果，并在2021年9月发布了全球首个图文音三模态千亿大模型，中文名字叫紫东.太初；支持文本、视觉、语音不同模态间的高效协同，可支撑影视创作、工业质检、智能驾驶等产业应用。

点击紫东.太初大模型卡片。

![image-20221114161947168](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E5%A4%A7%E6%A8%A1%E5%9E%8B/image-20221114161947168.png)

你可以点击相应的按钮进行体验：

![image-20221114164835806](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E5%A4%A7%E6%A8%A1%E5%9E%8B/image-20221114164835806.png)

以图生文：

![image-20221114164859523](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E5%A4%A7%E6%A8%A1%E5%9E%8B/image-20221114164859523.png)

以文生图：您可以选择您想要生成的图片数量。

![image-20221114164927272](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E5%A4%A7%E6%A8%A1%E5%9E%8B/image-20221114164927272.png)

视觉问答：您可以选择图片或者自定义一张图片，在对话框输入您的问题。

![image-20221114164703681](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E5%A4%A7%E6%A8%A1%E5%9E%8B/image-20221114164703681.png)

## [武大.LuoJia](https://xihe.mindspore.cn/modelzoo/luojia)

由武汉大学与华为昇腾AI团队联合研发，是遥感领域首个国产化自主可控的遥感专用机器学习框架，针对遥感数据像幅尺寸大、数据通道多、尺度变化大等特性， 具备内存可扩展、尺度通道灵活创建、数据通道自主优选、框架与数据协同处理的特点。可兼容已有深度学习框架， 并提供用户友好的、可拖拽的交互式网络结构搭建界面的方法。能屏蔽不同硬件设备间差异，同时管理多样化的遥感影像样本库LuoJiaSET， 实现遥多源感影像样本的高效存储管理。

点击武大.LuoJia大模型卡片

![image-20221114170127572](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E5%A4%A7%E6%A8%A1%E5%9E%8B/image-20221114170127572.png)

武大.LuoJia体验操作gif：

![image-20221114170127572](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E5%A4%A7%E6%A8%A1%E5%9E%8B/20221114-194451.gif)

## [鹏程.盘古](https://xihe.mindspore.cn/modelzoo/pangu)

业界首个千亿级参数中文自然语言处理了大模型，可支持知识问答、知识检索、知识推理、阅读理解等丰富的下游应用。「鹏程.盘古」由以鹏城实验室为首的技术团队联合攻关，首次基于“鹏城云脑Ⅱ”和国产MindSpore框架的自动混合并行模式实现在2048卡算力集群上的大规模分布式训练，训练出业界首个2000亿参数以中文为核心的预训练生成语言模型。鹏程·盘古α预训练模型支持丰富的场景应用，在知识问答、知识检索、知识推理、阅读理解等文本生成领域表现突出，具备很强的小样本学习能力。

点击鹏程.盘古大模型卡片。

![image-20221114173555037](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E5%A4%A7%E6%A8%A1%E5%9E%8B/image-20221114173555037.png)

在线体验对话生成：

![image-20221114181053152](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E5%A4%A7%E6%A8%A1%E5%9E%8B/image-20221114181053152.png)



