# 基于LSTM的文本情感分类任务教程

👉5分钟快速体验AI全流程开发

在此教程中，我们将通过Fork项目MindSpore/LSTM-imdb，快速体验AI全流程开发——训练、推理和评估。

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

- [Fork样例仓](#复制)
- [训练与评估](#训练与评估)
- [在线推理](#在线推理)

[问题反馈](#问题反馈)


***
<a name="基本介绍"></a>

## 基本介绍

<a name="任务简介"></a>

### 任务简介

基于公开的模型仓库 MindSpore/LSTM 进行文本情感分类模型的训练、在线推理。

#### LSTM简介
在自然语言处理中常用RNN网络，但RNN细胞结构简单，容易在训练中产生梯度消失问题。例如RNN网络在序列较长时，在序列尾部已经基本丢失了序列首部的信息。为了克服这一问题，LSTM(Long short term memory)模型被提出，通过门控机制来控制信息流在每个循环步中的留存和丢弃。下图为LSTM的细胞结构拆解：

<img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lstm/lstm-model.PNG" width="80%">

#### 数据集简介
使用的数据集是情感分类的经典数据集 [IMDB](https://www.imdb.com/) ，数据集对评论进行二分类划分，分为Positive和Negative两类。IMDB数据集提供了25,000条电影评论用于训练，25,000条电影评论用于测试。下面为其样例：

| Review                                                       | Label    |
| ------------------------------------------------------------ | -------- |
| “Quitting” may be as much about exiting a pre-ordained identity as about drug withdrawal. As a rural guy coming to Beijing, class and success must have struck this young artist face on as an appeal to separate from his roots and far surpass his peasant parents’ acting success. Troubles arise, however, when the new man is too new, when it demands too big a departure from family, history, nature, and personal identity. The ensuing splits, and confusion between the imaginary and the real and the dissonance between the ordinary and the heroic are the stuff of a gut check on the one hand or a complete escape from self on the other. | Negative |
| This movie is amazing because the fact that the real people portray themselves and their real life experience and do such a good job it’s like they’re almost living the past over again. Jia Hongsheng plays himself an actor who quit everything except music and drugs struggling with depression and searching for the meaning of life while being angry at everyone especially the people who care for him most. | Positive |

<a name="项目地址"></a>
### 项目地址
- 项目仓库： [MindSpore/LSTM-imdb](https://xihe.mindspore.cn/projects/MindSpore/LSTM)
- 模型仓库： [MindSpore/LSTM_model](https://xihe.mindspore.cn/models/MindSpore/LSTM_model)
- 数据集仓库： [drizzlezyk/imdb_dataset](https://xihe.mindspore.cn/datasets/MindSpore/imdb)

<a name="项目结构"></a>
### 项目结构

项目的目录分为两个部分：推理（inference）和训练（train），推理可视化相关的代码放在inference文件夹下，训练相关的代码放在train文件夹下。

```python
 ├── inference    # 推理可视化相关代码目录
 │  ├── app.py    # 推理核心启动文件
 │  └── pip-requirements.txt    # 推理可视化相关依赖文件
 └── train    # 在线训练相关代码目录
   ├── pip-requirements.txt  # 训练代码所需要的package依赖声明文件
   ├── lstm_aim_cust.py  # 自定义Aim训练代码 
   └── train.py       # 神经网络训练代码
```



***
<a name="效果展示"></a>

## 效果展示

<a name="训练"></a>
### 训练

   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/train_info.PNG" width="70%">

<a name="评估"></a>
### 评估

<img src=" https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/aim_metrics.png" width="70%">

<a name="推理"></a>
### 推理

 <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lstm/gradio-positive.PNG" width="70%">




***
<a name="快速开始"></a>
## 快速开始

<a name="复制"></a>
### Fork样例仓

1. 在项目搜索页中，搜索样例仓 **MindSpore/LSTM**

2. 点击“**Fork**”


<a name="训练与评估"></a>
### 训练与评估

创建训练后，就可以通过普通日志和可视化日志观察训练动态。

1. 选择“**训练**”页签，点击“**创建训练实例**”，在线填写表单，首先填写训练名称，选择对应的代码目录、启动文件。

   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lstm/train_form01.PNG" width="70%">

2. 输入模型、数据集、输出路径等超参数指定：
- 在表单中指定使用的预训练模型文件存放路径（文件存放在昇思大模型平台的模型模块下）
- 在表单中指定使用的数据集文件存放路径（文件存放在昇思大模型平台的数据集模块下）
- 训练的输出结果统一指定超参数名：output_path，需要在代码的argparse模块声明

   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lstm/train_form02.PNG" width="70%">

3. 点击创建训练，注意一个仓库同时只能有一个运行中的训练实例，且训练实例最多只能5个

4. 查看训练列表：将鼠标放置于“**训练**”栏上，点击训练下拉框中的“**训练列表**”即可。
  
   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lstm/lstm-train-list.PNG" width="70%"> 
   
5. 查看训练日志：点击训练名称，即可进入该训练的详情页面

   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/train_info.PNG" width="70%">
- 所有输出到超参数output_path的文件都在tar.gz文件中。

6. 自定义评估：
   
   如需要使用自定义评估，在创建训练实例时请将自定义评估按钮打开：

   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/aim.PNG" width="70%">

   在训练表单选择启动文件时选择 lstm_aim_cust.py
   
   注意：如果需要修改评估代码，请确保代码中超参数有**aim_repo**.


7. 训练结束后，点击开始评估按钮，等待加载完成后，即可查看评估结果。
  
   注：评估过程中按钮不可用，自定义评估方式等待时间会较长，请您耐心等待。

8. 查看报告

   评估完成后，我们可以查看生成的报告，包括代码中跟踪的变量：
   损失值的变化图如下：

   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/aim_loss.png" width="70%">

   综合查看多个metics的变化趋势可以点击metrics，然后添加想查看的metrics后点击Search：

   <img src=" https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/aim_metrics.png" width="70%">
   


<a name="在线推理"></a>
### 在线推理

本仓的推理模块是将训练好的模型迁移到实时的文本分类任务中，可以将某段文本预测为Positive/Negative


<a name="具体操作"></a>
#### 具体操作

1. 选择“**推理**”页签，点击“**启动**”按钮

2. 等待2分钟左右，会出现推理可视化界面，将需要预测的文字输入到文本框中即可进行预测。

    <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lstm/gradio-lstm.PNG" width="70%">


3. LSTM情感分类效果展示：

    <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lstm/gradio-positive.PNG" width="70%">



***
<a name="问题反馈"></a>
## 问题反馈

您如果按照教程在操作过程中出现任何问题，请您随时在我们的官网仓提issue，我们会及时回复您。如果您有任何建议，也可以添加官方助手小猫子（微信号：mindspore0328），我们非常欢迎您的宝贵建议，如被采纳，会收到MindSpore官方精美礼品哦！
