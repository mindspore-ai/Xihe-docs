[[toc]]

# 基于CycleGAN的艺术家画作风格迁移


在此教程中，我们将通过drizzlezyk/CycleGAN项目，快速体验艺术家画作风格迁移的训练、在线推理。

## 基本介绍

### 任务简介

基于公开的模型仓库 drizzlezyk/CycleGAN进行模型训练，并使用仓库下的模型文件实现在线图像风格迁移。

#### CycleGAN模型简介
CycleGAN是发表在ICCV2017关于将GAN应用在无监督的图像到图像翻译（image-to-image translation）的著名算法。可以使用不配对的数据进行匹配，如下图右所示，下图左边是配对数据：
    
<img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/cycleGAN/cycleGAN-data.PNG" width="80%">

其模型结构包括两个生成器G_X, G_Y，和两个判别器D_X, D_Y，结构图如下：

<img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/cycleGAN/cycleGAN-model.PNG" width="80%">

#### 数据集简介
使用的数据集包括两个风格的图片：
- 梵高画作图片 256*256
- 自然风格照片 256*256

### 项目地址
- 模型仓库：[drizzlezyk/CycleGAN](https://xihe.mindspore.cn/projects/drizzlezyk/CycleGAN)
- 数据集地址：[drizzlezyk/CycleGAN_image](https://xihe.mindspore.cn/datasets/drizzlezyk/CycleGAN_image)

### 项目结构

项目的目录分为两个部分：推理（inference）和训练（train），推理可视化相关的代码放在inference文件夹下，训练相关的代码放在train文件夹下。

```python
 ├── inference    # 推理可视化相关代码目录
 │  ├── app.py    # 推理核心启动文件
 │  ├── pip-requirements.txt    # 推理可视化相关依赖文件
 │  ├── config.json
 └── train    # 在线训练相关代码目录
   ├── config.json  # 训练配置文件，用于指定代码路径、超参数、数据路径等
   └── trainDir         # 训练代码所在的目录
     ├── pip-requirements.txt  # 训练代码所需要的package依赖声明文件
     └── train.py       # 神经网络训练代码
```

## 效果展示

### 训练

 <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/trainlog.PNG" width="80%">

### 推理
<img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/cycleGAN/dire2.PNG" width="80%">


## 快速开始

### Fork样例仓

1. 在项目搜索框中输入CycleGAN，找到样例仓 **drizzlezyk/CycleGAN**

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
     "job_description": "训练CycleGAN，epoch=100",    //对当前训练实例的描述
     "inputs": [
     		{"input_url": "datasets/drizzlezyk/CycleGAN_image/",
     		"name": "data_url"  //数据路径
     		}],
     "job_name": "test1"               //训练名称
     }
     ```

   - 选择填写表单方式创建训练:将json文件中对应的值填到表单即可。

3. 点击创建训练，注意一个仓库同时只能有一个运行中的训练实例，且训练实例最多只能5个

4. 查看训练列表：将鼠标放置于“**训练**”栏上，点击训练下拉框中的“**训练列表**”即可
  
   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/resnet-train-list.PNG" width="80%">

 

5. 查看训练日志：点击训练名称，即可进入该训练的详情页面
   <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/resnet50/trainlog.PNG" width="80%">

### 在线推理

本仓的推理模块是将训练好的模型应用到实时的图像风格迁移任务中，可将一些生活中自然风光的照片和艺术家的画作进行相互的风格迁移，具体如下：


#### 具体操作如下：

1. 选择“**推理**”页签，点击“**启动**”按钮

2. 等待2分钟左右，出现推理可视化界面，界面可以选择两个风格迁移方向的其中一个：

    <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/cycleGAN/cycleGAN-direction.PNG" width="50%">

- Van Gogh->Real：放置一张梵高的画作，转换为真实画风

    <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/cycleGAN/dire1.PNG" width="70%">

- Real->Van Gogh：放置一张照片，转换为梵高风格

    <img src="https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/cycleGAN/dire2.PNG" width="70%">

  **注意**： 在放置图片后一定记得选择迁移的方向（Van Gogh->Real或Real->Van Gogh，二选一），否则会报错。

# 问题反馈

您如果按照教程操作过程中出现任何问题，您可以联系我们的邮箱`contact@mindspore.cn`，我们会及时回复您。如果您有任何建议，也可以添加官方助手小猫子（微信号：mindspore0328），我们非常欢迎您的宝贵建议，如被采纳，会受到MindSpore官方精美礼品哦！