[[toc]]

# 基于LSTM的文本情感分类任务教程

在此教程中，我们将通过Fork样例仓 drizzlezyk/LSTM，快速体验在昇思大模型体验平台实现AI全流程开发——训练、推理和评估。


## 基本介绍

### 任务简介

基于公开的模型仓库 drizzlezyk/LSTM 进行文本情感分类模型的训练、在线推理。

#### LSTM简介
在自然语言处理中常用RNN网络，但RNN细胞结构简单，容易在训练中产生梯度消失问题。例如RNN网络在序列较长时，在序列尾部已经基本丢失了序列首部的信息。为了克服这一问题，LSTM(Long short term memory)模型被提出，通过门控机制来控制信息流在每个循环步中的留存和丢弃。下图为LSTM的细胞结构拆解：

<img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lstm/lstm-model.PNG" width="80%">

#### 数据集简介
使用的数据集是情感分类的经典数据集 [IMDB](https://www.imdb.com/) ，数据集对评论进行二分类划分，分为Positive和Negative两类。IMDB数据集提供了25,000条电影评论用于训练，25,000条电影评论用于测试。下面为其样例：

| Review                                                       | Label    |
| ------------------------------------------------------------ | -------- |
| “Quitting” may be as much about exiting a pre-ordained identity as about drug withdrawal. As a rural guy coming to Beijing, class and success must have struck this young artist face on as an appeal to separate from his roots and far surpass his peasant parents’ acting success. Troubles arise, however, when the new man is too new, when it demands too big a departure from family, history, nature, and personal identity. The ensuing splits, and confusion between the imaginary and the real and the dissonance between the ordinary and the heroic are the stuff of a gut check on the one hand or a complete escape from self on the other. | Negative |
| This movie is amazing because the fact that the real people portray themselves and their real life experience and do such a good job it’s like they’re almost living the past over again. Jia Hongsheng plays himself an actor who quit everything except music and drugs struggling with depression and searching for the meaning of life while being angry at everyone especially the people who care for him most. | Positive |

### 项目地址
- 项目仓库： [drizzlezyk/LSTM](https://xihe.mindspore.cn/projects/drizzlezyk/LSTM)
- 模型仓库： [drizzlezyk/LSTM_model](https://xihe.mindspore.cn/models/drizzlezyk/LSTM_model)
- 数据集仓库： [drizzlezyk/imdb](https://xihe.mindspore.cn/datasets/drizzlezyk/imdb)

### 项目结构

项目的目录分为两个部分：推理（inference）和训练（train），推理可视化相关的代码放在inference文件夹下，训练相关的代码放在train文件夹下。

```python
 ├── inference    # 推理可视化相关代码目录
 │  ├── app.py    # 推理核心启动文件
 │  └── pip-requirements.txt    # 推理可视化相关依赖文件
 └── train    # 在线训练相关代码目录
   ├── config.json  # 训练配置文件，用于指定代码路径、超参数、数据路径等
   └── trainDir         # 训练代码所在的目录
     ├── pip-requirements.txt  # 训练代码所需要的package依赖声明文件
     ├── lstm_aim_cust.py  # 自定义Aim训练代码 
     └── train.py       # 神经网络训练代码
```

## 效果展示

### 训练

   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lstm/lstm-train.PNG" width="80%">

### 评估

<img src=" https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/aim_metrics.png" width="80%">

### 推理

 <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lstm/gradio-positive.PNG" width="80%">

## 快速开始

### Fork 样例仓

1. 在项目搜索页中，搜索样例仓 **drizzlezyk/LSTM**

2. 点击“**Fork**”

### 训练与评估

创建训练后，就可以通过普通日志和可视化日志观察训练动态。

1. 选择“**训练**”页签，点击“**创建训练实例**”按钮，配置训练参数有两种方式：

   1. 通过json格式的配置文件创建和在线填写表单

2. 两种方式创建步骤如下：

   - 选择“**选择配置文件**”页签:在“**输入框**”输入训练配置模板的路径 train/config.json，点击确认按钮，train/config.json将会加载到下方表单，json文件中各个字段的注释如下，更多的详细介绍参考创建训练实例

     ```json
     {	
     "SDK": "ModelArts",               	//训练平台，目前支持ModelArts
     "code_dir": "train/train_dir/",	  	//模型训练相关代码以及配置需求文件所在目录	
     "boot_file": "train.py",			//启动文件
     "outputs": [{						//训练过程需要输出的一些文件的路径设置
         "output_dir": "train/output/",	
         "name": "output_url"
     }],
     "hypeparameters": [{                  //超参数，模型训练的超参数的值可以在该模块进行更改，如需添加超参数，需要更改train.py源代码
     	"name": "epochs",
     		"value": "100"
     }],
     "frameworks": {						//模型所需的深度学习框架，目前支持MindSpore
         "framework_type": "MPI",
         "framework_version": "mindspore_1.3.0-cuda_10.1-py_3.7-ubuntu_1804-x86_64",
     },
     "train_instance_type": "modelarts.p3.large.public",	//计算资源
     "log_url": "train/log/",			//日志文件的保存路径
     "env_variables": {					//环境变量
     },
     "job_description": "训练LSTM，epoch=100",    //对当前训练实例的描述
     "inputs": [{						//输入
         "input_url": "datasets/drizzlezyk/imdb/imdb_224.ckpt",
     		"name": "pretrain_url"},
     		{"input_url": "datasets/drizzlezyk/imdb/",
     		"name": "data_url"
     		}],
     "job_name": "test1"               //训练名称
     }
     ```

   - 选择填写表单方式创建训练:将json文件中对应的值填到表单即可。

3. 点击创建训练，注意一个仓库同时只能有一个运行中的训练实例，且训练实例最多只能5个

4. 查看训练列表：将鼠标放置于“**训练**”栏上，点击训练下拉框中的“**训练列表**”即可
   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lstm/lstm-train-list.PNG" width="90%"> 
   
5. 查看训练日志：点击训练名称，即可进入该训练的详情页面
   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lstm/lstm-train.PNG" width="90%">

6. 自定义评估：
   如需要使用自定义评估，在创建训练实例时请选择train/config_aim.json文件：
   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/aim_config.PNG" width="80%">
   
   若此训练实例满足Aim的必要条件(即代码中有aim模块，以及train目录下有.aim文件夹)，则选择自定义评估页签。
   在目录中填写.aim文件夹所在路径：/db/.aim即可。

   注：只有训练完成之后，评估功能才可用

8. 点击开始评估按钮
   
   评估过程中按钮不可点击，评估等待时间会较长，请您耐心等待

9. 查看报告

   评估完成后，我们可以查看生成的报告，包括代码中跟踪的变量：
损失值的变化图如下：

   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/aim_loss.png" width="60%">

   综合查看多个metics的变化趋势可以点击metrics，然后添加想查看的metrics后点击Search：

   <img src=" https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/aim_metrics.png" width="80%">
   



### 在线推理

本仓的推理模块是将训练好的模型迁移到实时的文本分类任务中，可以将某段文本预测为Positive/Negative

#### 具体操作

1. 选择“**推理**”页签，点击“**启动**”按钮

2. 等待2分钟左右，会出现推理可视化界面，将需要预测的文字输入到文本框中即可进行预测。

    <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lstm/gradio-lstm.PNG" width="70%">


3. LSTM情感分类效果展示：

    <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lstm/gradio-positive.PNG" width="70%">

## 问题反馈

您如果按照教程操作过程中出现任何问题，您可以联系我们的邮箱`contact@mindspore.cn`，我们会及时回复您。如果您有任何建议，也可以添加官方助手小猫子（微信号：mindspore0328），我们非常欢迎您的宝贵建议，如被采纳，会受到MindSpore官方精美礼品哦！