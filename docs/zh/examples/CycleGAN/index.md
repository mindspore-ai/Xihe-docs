# 基于CycleGAN的艺术家画作风格迁移
2022年11月17日**更新**

在此教程中，我们将通过MindSpore/CycleGAN项目，快速体验艺术家画作风格迁移的训练、在线推理。


# 目录  
[基本介绍](#基本介绍)  

- [任务简介](#任务简介)
- [项目地址](#项目地址)
- [项目结构](#项目结构)

[效果展示](#效果展示)
- [训练](#训练)
- [推理](#推理)

[快速开始](#快速开始)

- [Fork样例仓](#Fork样例仓)
- [训练与评估](#训练与评估)
- [在线推理](#在线推理)

[问题反馈](#问题反馈)



***
<a name="基本介绍"></a>

## 基本介绍

<a name="任务简介"></a>

### 任务简介

基于公开的模型仓库 MindSpore/CycleGAN进行模型训练，并使用仓库下的模型文件实现在线图像风格迁移。

#### CycleGAN模型简介
CycleGAN是发表在ICCV2017关于将GAN应用在无监督的图像到图像翻译（image-to-image translation）的著名算法。可以使用不配对的数据进行匹配，如下图右所示，下图左边是配对数

<img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/cycleGAN/cycleGAN-data.PNG" width="70%">

其模型结构包括两个生成器G_X, G_Y，和两个判别器D_X, D_Y，结构图如下：

<img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/cycleGAN/cycleGAN-model.PNG" width="70%">

<img src="http://latex.codecogs.com/gif.latex?\frac{S_{correct}}{S_{all}}" />

<img src="http://latex.codecogs.com/gif.latex?FID=||\mu_r-\mu_g||^2+Tr(\Sigma_{r}+\Sigma_{g}+(\Sigma_{r}+\Sigma_{g})^{\frac{1}{2}})" />


#### 数据集简介
使用的数据集包括两个风格的图片：
- 梵高画作图片 256*256
- 自然风格照片 256*256

<a name="项目地址"></a>
### 项目地址
- 模型仓库：[MindSpore/CycleGAN](https://xihe.mindspore.cn/projects/MindSpore/CycleGAN)
- 数据集地址：[drizzlezyk/CycleGAN_image](https://xihe.mindspore.cn/datasets/drizzlezyk/CycleGAN_image)
- 模型地址：[MindSpore/CycleGAN_model](https://xihe.mindspore.cn/models/MindSpore/CycleGAN_image)


<a name="项目结构"></a>
### 项目结构

项目的目录分为两个部分：推理（inference）和训练（train），推理可视化相关的代码放在inference文件夹下，训练相关的代码放在train文件夹下。

```python
 ├── inference    # 推理可视化相关代码目录
 │  ├── app.py    # 推理核心启动文件
 │  ├── pip-requirements.txt    # 推理可视化相关依赖文件
 └── train    # 在线训练相关代码目录 
    ├── pip-requirements.txt  # 训练代码所需要的package依赖声明文件
    └── train.py       # 神经网络训练代码
    ├── other code
```



***
<a name="效果展示"></a>
## 效果展示

<a name="训练"></a>

### 训练

<img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/train_info.PNG" width="70%">

<a name="推理"></a>
### 推理

<img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/cycleGAN/dire2.PNG" width="70%">

***
<a name="快速开始"></a>
## 快速开始

<a name="Fork样例仓"></a>

### Fork样例仓

1. 在项目搜索框中输入CycleGAN，找到样例仓 **MindSpore/CycleGAN**

2. 点击Fork

<a name="训练与评估"></a>

### 训练与评估

创建训练后，就可以通过普通日志和可视化日志观察训练动态。

1. 选择“**训练**”页签，点击“**创建训练实例**”，在线填写表单，首先填写训练名称，选择对应的代码目录、启动文件。

    <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/cycleGAN/train_form01.PNG" width="70%">

2. 输入模型数据集、输出路径等超参数指定：
- 在表单中指定使用的预训练模型文件存放路径（文件存放在昇思大模型平台的模型模块下）

    <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/cycleGAN/train_form_model.PNG" width="70%">

- 在表单中指定使用的数据集文件存放路径（文件存放在昇思大模型平台的数据集模块下）

    <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/cycleGAN/train_form_dataset.PNG" width="70%">


- 加入训练需要的超参数：

    <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/cycleGAN/train_form03.PNG" width="70%">

    **注意**：请将hypeparameters下的platform设置为CPU，否则可能会训练失败。 
- 训练的输出结果统一指定超参数名：output_path，需要在代码的argparse模块声明
3. 点击创建训练，注意一个仓库同时只能有一个运行中的训练实例，且训练实例最多只能5个。

4. 查看训练列表：将鼠标放置于“**训练**”栏上，点击训练下拉框中的“**训练列表**”即可。
  
   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/resnet-train-list.PNG" width="70%">


5. 查看、下载训练日志，下载输出文件：点击训练名称，即可进入该训练的详情页面。

   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/train_info.PNG" width="70%">
   
- 所有输出到超参数output_path的文件都在tar.gz文件中。


<a name="在线推理"></a>
### 在线推理

本项目的推理模块是将训练好的模型应用到实时的图像风格迁移任务中，可将一些生活中自然风光的照片和艺术家的画作进行相互的风格迁移，具体如下：


1. 选择“**推理**”页签，点击“**启动**”按钮。

2. 等待2分钟左右，出现推理可视化界面，界面可以选择两个风格迁移方向的其中一个：

    <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/cycleGAN/cycleGAN-direction.PNG" width="50%">
    

- Van Gogh->Real：放置一张梵高的画作，转换为真实画风：

    <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/cycleGAN/dire1.PNG" width="70%">

- Real->Van Gogh：放置一张照片，转换为梵高风格：

    <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/cycleGAN/dire2.PNG" width="70%">

  **注意**： 在放置图片后一定记得选择迁移的方向（Van Gogh->Real或Real->Van Gogh，二选一），否则会报错。


***
<a name="问题反馈"></a>

# 问题反馈

本教程会持续更新，您如果按照教程在操作过程中出现任何问题，请您随时在我们的[官网仓](https://gitee.com/mindspore/mindspore)提ISSUE，我们会及时回复您。如果您有任何建议，也可以添加官方助手小猫子（微信号：mindspore0328），我们非常欢迎您的宝贵建议，如被采纳，会收到MindSpore官方精美礼品哦！
