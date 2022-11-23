
# 基于ResNet50的图片分类任务

👉5分钟快速体验AI全流程开发

MindSpore/ResNet50，快速体验AI全流程开发——训练、评估和在线。


# 目录  
[基本介绍](#基本介绍)  

- [任务简介](#任务简介)
- [项目地址](#项目地址)
- [项目结构](#项目结构)

[效果展示](#效果展示)
- [训练](#训练)
- [评估](#评估)
- [推理](#推理)

[快速开始](#快速开始)

- [Fork样例仓](#Fork)
- [训练与评估](#训练与评估)
- [在线推理](#在线推理)

[问题反馈](#问题反馈)



***
<a name="基本介绍"></a>
## 基本介绍

<a name="任务简介"></a>

### 任务简介

MindSpore/ResNet50进行模型训练，并使用仓库下的MindSpore模型文件实现在线图像预测。

#### ResNet50模型介绍
ResNet50网络是2015年由微软实验室的何恺明提出，获得ILSVRC2015图像分类竞赛第一名。在ResNet网络提出之前，传统的卷积神经网络都是将一系列的卷积层和池化层堆叠得到的，随着网络的加深，网络会发生退化，预测精度会降低。
ResNet50的残差模块如下图，ResNet通过该残差模块解决了深度网络退化问题。

<img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/resnet-model.PNG" width="70%">

#### 数据集介绍
使用的数据集是图像分类的经典数据集 [cifar10](http://www.cs.toronto.edu/~kriz/cifar.html) ，数据集包含60000张32*32的彩色图片，图片包含10类（'airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck'）。

<a name="项目地址"></a>
### 项目地址
- 模型仓库：[MindSpore/ResNet50](https://xihe.mindspore.cn/projects/MindSpore/ResNet50)
- 数据集地址：[drizzlezyk/cifar10](https://xihe.mindspore.cn/datasets/drizzlezyk/cifar10)
- 预训练模型地址：[MindSpore/ResNet50_model](https://xihe.mindspore.cn/models/MindSpore/ResNet50_model/tree)

<a name="项目结构"></a>

### 项目结构

项目的目录分为两个部分：推理（inference）和训练（train），推理可视化相关的代码放在inference文件夹下，训练相关的代码放在train文件夹下。

```python
 ├── inference    # 推理可视化相关代码目录
 │  ├── app.py    # 推理核心启动文件
 │  └── pip-requirements.txt    # 推理可视化相关依赖文件
 └── train    # 在线训练相关代码目录
   ├── pip-requirements.txt  # 训练代码所需要的package依赖声明文件
   ├── resnet50_aim_cust.py  # 自定义Aim训练代码 
   └── xihe_resnet50.py       # 神经网络训练代码
```

***
<a name="效果展示"></a>
## 效果展示

<a name="训练"></a>
### 训练

   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/train_info.PNG" width="70%">

<a name="评估"></a>
### 评估

<img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/aim_metrics.png" width="70%">

<a name="推理"></a>
### 推理

   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/deer.PNG" width="70%">


***
<a name="快速开始"></a>
## 快速开始


<a name="Fork"></a>
### Fork样例仓

1. 在项目搜索框中输入ResNet50，找到样例仓 **MindSpore/ResNet50**

2. 点击Fork


<a name="训练与评估"></a>
### 训练与评估

创建训练后，就可以通过普通日志和可视化日志观察训练动态。

1. 选择“**训练**”页签，点击“**创建训练实例**”，在线填写表单，首先填写训练名称，选择对应的代码目录、启动文件。

   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/train_form1.PNG" width="70%">

2. 输入模型、数据集、输出路径等超参数指定：
- 在表单中指定使用的预训练模型文件存放路径（文件存放在昇思大模型平台的模型模块下）
- 在表单中指定使用的数据集文件存放路径（文件存放在昇思大模型平台的数据集模块下）
- 训练的输出结果统一指定超参数名：output_path，需要在代码的argparse模块声明

   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/train_form02.PNG" width="70%">


3. 点击创建训练，注意一个仓库同时只能有一个运行中的训练实例，且训练实例最多只能5个

4. 查看训练列表：将鼠标放置于“**训练**”栏上，点击训练下拉框中的“**训练列表**”即可
  
   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/resnet-train-list.PNG" width="70%">

 

5. 查看、下载训练日志，下载输出文件：点击训练名称，即可进入该训练的详情页面

   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/train_info.PNG" width="70%">
   
- 所有输出到超参数output_path的文件都在tar.gz文件中。

6. 自定义评估

   如需要使用自定义评估，在创建训练实例时请将自定义评估按钮打开：

   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/aim.PNG" width="70%">

   在训练表单选择启动文件时选择 resnet50_aim_cust.py


   注：只有训练完成之后，评估功能才可用

7. 训练结束后，点击开始评估按钮，等待加载完成后，即可查看评估结果
  
   注：评估过程中按钮不可用，自定义评估方式等待时间会较长，请您耐心等待。

8. 查看报告
   评估完成后，我们可以查看生成的报告，包括代码中跟踪的变量：

   损失值的变化图如下：

   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/aim_loss.png" width="70%">

   综合查看多个metics的变化趋势可以点击metrics，然后添加想查看的metrics后点击Search：

   <img src=" https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/aim_metrics.png" width="70%">
   

<a name="在线推理"></a>
### 在线推理

本仓的推理模块是将训练好的模型迁移到实时的图像预测任务中，可识别图像一共10个类别，具体如下：

```python
class_names = ['airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck']
```

#### 具体操作如下：

1. 选择“**推理**”页签，点击“**启动**”按钮

2. 等待2分钟左右，出现推理可视化界面，将需预测的图片上传或拖拽到图片框中即可进行预测。

   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/inference.PNG" width="70%">

3. ResNet50图像分类效果展示：

   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/deer.PNG" width="70%">

  


***
<a name="问题反馈"></a>
# 问题反馈

您如果按照教程在操作过程中出现任何问题，请您随时在我们的[官网仓](https://gitee.com/mindspore/mindspore)提ISSUE，我们会及时回复您。如果您有任何建议，也可以添加官方助手小猫子（微信号：mindspore0328），我们非常欢迎您的宝贵建议，如被采纳，会收到MindSpore官方精美礼品哦！
