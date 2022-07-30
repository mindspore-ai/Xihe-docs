[[toc]]

# 基于ResNet50的图片分类任务

在此教程中，我们将通过Fork样例仓 drizzlezyk/ResNet50，快速体验在昇思大模型体验平台实现AI全流程开发——训练、推理和评估。



## 基本介绍

### 任务简介

基于公开的模型仓库 drizzlezyk/ResNet50进行模型训练，并使用仓库下的MindSpore模型文件实现在线图像预测。

#### ResNet50模型介绍
ResNet50网络是2015年由微软实验室的何恺明提出，获得ILSVRC2015图像分类竞赛第一名。在ResNet网络提出之前，传统的卷积神经网络都是将一系列的卷积层和池化层堆叠得到的，随着网络的加深，网络会发生退化，预测精度会降低。
ResNet50的残差模块如下图，ResNet通过该残差模块解决了深度网络退化问题。

<img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/resnet-model.PNG" width="70%">

#### 数据集介绍
使用的数据集是图像分类的经典数据集 [cifar10](http://www.cs.toronto.edu/~kriz/cifar.html) ，数据集包含60000张32*32的彩色图片，图片包含10类（'airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck'）。



### 项目地址

- 模型仓库：[drizzlezyk/ResNet50](https://xihe.mindspore.cn/projects/drizzlezyk/ResNet50)

- 数据集地址：[drizzlezyk/cifar10](https://xihe.mindspore.cn/datasets/drizzlezyk/cifar10)

- 预训练模型地址：[drizzlezyk/ResNet50_model](https://xihe.mindspore.cn/models/drizzlezyk/ResNet50_model/tree)

  

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
     ├── resnet50_aim_cust.py  # 自定义Aim训练代码 
     └── xihe_resnet50.py       # 神经网络训练代码
```


## 效果展示

### 训练

   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/trainlog.PNG" width="70%">

### 评估

<img src=" https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/aim_metrics.png" width="70%">

### 推理

   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/deer.PNG" width="70%">

## 快速开始

### Fork样例仓

1. 在项目搜索框中输入ResNet50，找到样例仓 **drizzlezyk/ResNet50**

2. 点击Fork

### 训练与评估

创建训练后，就可以通过普通日志和可视化日志观察训练动态。

1. 选择“**训练**”页签，点击“**创建训练实例**”按钮，配置训练参数有两种方式：（1）通过json格式的配置文件创建；（2）在线填写表单。

2. 两种方式创建步骤如下：

   - 选择“**选择配置文件**”页签:在“**输入框**”输入训练配置模板的路径 **train/config.json**，点击确认按钮，train/config.json将会加载到下方表单，json文件中各个字段的注释如下，更多的详细介绍参考创建训练实例：

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
     		"value": "30"
     }],
     "frameworks": {						//模型所需的深度学习框架，目前支持MindSpore
         "framework_type": "MPI",
         "framework_version": "mindspore_1.3.0-cuda_10.1-py_3.7-ubuntu_1804-x86_64",
     },
     "train_instance_type": "modelarts.p3.large.public",	//计算资源
     "log_url": "train/log/",			//日志文件的保存路径
     "env_variables": {					//环境变量
     },
     "job_description": "训练resnet50，epoch=100",    //对当前训练实例的描述
     "inputs": [{						//输入
         "input_url": "datasets/drizzlezyk/cifar10/resnet50_224.ckpt",
     		"name": "pretrain_url"},
     		{"input_url": "datasets/drizzlezyk/cifar10/",
     		"name": "data_url"
     		}],
     "job_name": "test1"               //训练名称
     }
     ```

   - 选择填写表单方式创建训练:将json文件中对应的值填到表单即可。

3. 点击创建训练，注意一个仓库同时只能有一个运行中的训练实例，且训练实例最多只能5个

4. 查看训练列表：将鼠标放置于“**训练**”栏上，点击训练下拉框中的“**训练列表**”即可
  
   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/resnet-train-list.PNG" width="70%">

 

5. 查看训练日志：点击训练名称，即可进入该训练的详情页面
   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/trainlog.PNG" width="70%">

6. 自定义评估

   如需要使用自定义评估，在创建训练实例时请选择train/config_aim.json文件：

   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/aim_config.PNG" width="70%">
   
   若此训练实例满足Aim的必要条件(即代码中有aim模块，以及train目录下有.aim文件夹)，则选择自定义评估页签。
   在目录中填写.aim文件夹所在路径：/db/.aim即可。


   注：只有训练完成之后，评估功能才可用

7. 进入训练日志详情页，点击开始评估按钮，并填写aim相关文件存放的路径: ./db/
  
   注：评估过程中按钮不可用，自定义评估方式等待时间会较长，请您耐心等待

8. 查看报告
评估完成后，我们可以查看生成的报告，包括代码中跟踪的变量：
损失值的变化图如下：

   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/aim_loss.png" width="70%">

   综合查看多个metics的变化趋势可以点击metrics，然后添加想查看的metrics后点击Search：

   <img src=" https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/aim_metrics.png" width="70%">

### 推理可视化

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

# 问题反馈

您如果按照教程操作过程中出现任何问题，您可以联系我们的邮箱`contact@mindspore.cn`，我们会及时回复您。如果您有任何建议，也可以添加官方助手小猫子（微信号：mindspore0328），我们非常欢迎您的宝贵建议，如被采纳，会受到MindSpore官方精美礼品哦！