[[toc]]

# &#x1F449;5分钟快速体验AI全流程开发

在此教程中，我们将通过fork样例仓 <a href ="https://xihe.mindspore.cn/projects/wesley/lenet5_demo">wesley/lenet5_demo</a>，快速体验在昇思大模型体验平台实现AI全流程开发——训练、推理和评估。

## 基本介绍

### LeNet描述

LeNet是1998年提出的一种典型的卷积神经网络。它被用于数字识别并取得了巨大的成功。

[论文](https://gitee.com/link?target=https%3A%2F%2Fieeexplore.ieee.org%2Fdocument%2F726791)： Y.Lecun, L.Bottou, Y.Bengio, P.Haffner.Gradient-Based Learning Applied to Document Recognition.*Proceedings of the IEEE*.1998.

### 模型架构

LeNet非常简单，包含5层，由2个卷积层和3个全连接层组成。

![image0](https://mindspore-website.obs.cn-north-4.myhuaweicloud.com/website-images/r1.7/tutorials/source_zh_cn/beginner/images/lenet.png)

### 任务简介

基于公开的模型仓库 <a href ="https://xihe.mindspore.cn/projects/wesley/lenet5_demo">wesley/lenet_mnist</a> 下的MindSpore预训练文件 `lenet-1_1875.ckpt` 和数据集 <a href="https://xihe.mindspore.cn/datasets/wesley/mnist">wesley/mnist</a> 实现迁移学习，在昇思大模型体验平台体验训练、评估和推理可视化全流程AI开发体验。

**项目地址**

- 预训练模型：<a href="https://xihe.mindspore.cn/models/wesley/lenet_mnist">wesley/lenet_mnist</a>
- 数据集：<a href="https://xihe.mindspore.cn/datasets/wesley/mnist">wesley/mnist</a>
- 项目：<a href="https://xihe.mindspore.cn/projects/wesley/lenet5_demo">wesley/lenet5_demo</a>

**目录结构**

```shell
.
├── inference # 推理可视化相关代码
│   ├── app.py # 推理核心启动文件
│   └── pip-requirements.txt  # 推理可视化相关依赖文件
└── train # 训练可视化相关代码
    ├── config.json # 训练配置模板
    └── trainDir # 训练代码
        ├── pip-requirements.txt # 训练相关依赖文件
        ├── train_customize_aim.py # 自定义Aim训练代码 
        ├── train_gridsearch.py # grid search + LossMonitor 训练代码
        |── train_valaccmonitor.py # Monitor训练代码
        └── train.py # LossMonitor训练代码
       
```

> 注：推理可视化相关的代码放在了`inference`文件夹下，训练相关的代码放在了`train`文件夹下。



## 效果展示

### 训练

训练列表

![训练列表](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lenet/effect_trainlist.png)

训练日志

![训练日志](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lenet/effect_log.png)

### 评估

![aim评估](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lenet/effect_metrics.png)

由上图可知，当batch_size为64，momentum为0.9时，leanring_rate为0.1的loss最小

### 推理

![训练推理](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lenet/effect_inference.png)



## 快速开始

### Fork 样例仓

1.在项目搜索页中，搜索样例仓 <a href ="https://xihe.mindspore.cn/projects/wesley/lenet5_demo">wesley/lenet5_demo</a>

![项目搜索](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lenet/qucikstart_search.png)

2.点击Fork

![Fork](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lenet/quickstart_fork.png)

### 训练与评估

1.选择`训练`页签，点击`创建训练实例`按钮

![创建训练实例](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lenet/quickstart_createtrain.png)

2.选择`选择配置文件`页签，在输入框输入训练配置模板的路径 `train/config.json`，点击`确认`按钮，将会读取下面的一个json，各个字段的意思如注释所见，更多的详细介绍参考 <a href="">创建训练实例</a>

```json
{	
    "SDK": "ModelArts", //训练平台
    "code_dir": "train/trainDir/", //代码目录	
    "boot_file": "train.py"， //启动文件
    "outputs": [{ //输出
        "output_dir": "train/output/",	
        "name": "output_url"
    }
    ]
    ,
    "hypeparameters": { //超参
    },
    "frameworks": { //框架
        "framework_type": "MPI",
        "framework_version": "mindspore_1.3.0-cuda_10.1-py_3.7-ubuntu_1804-x86_64",
    },
    "train_instance_type": "modelarts.p3.large.public",	//计算资源
    "log_url": "train/log/", //日志路径
    "env_variables": { //环境变量
    },
    "job_description": "测试train.py", //描述
    "inputs": [{ //输入
        "input_url": "models/wesley/lenet_mnist/lenet-1_1875.ckpt",
        "name": "pretrain_url"
    }, {
        "input_url": "datasets/wesley/mnist/",
        "name": "data_url"
    }],
    "job_name": "ceshi1" //训练名称
}
```

3.选择不同的启动文件，您将体验不同评估功能，同时你需要适配的更改上面的配置文件，请选择一种评估方式体验

- 评估方式1——训练日志可视化

  ```json
  {	
      ...	
      "boot_file": "train_gridsearch.py", //启动文件
      "outputs": [{ //输出
          "output_dir": "train/output/",	
          "name": "output_url"
      }
      ]
      ...
      "env_variables": { //环境变量
      },
      "job_description": "测试train_gridsearch.py", //描述
      "job_name": "ceshi1" //训练名称
  }
  ```

- 评估方式2——自定义评估

  ```json
  {
      ....
      "boot_file": "train_customize_aim.py",
      "outputs": [{
          "output_dir": "train/output_suctomize/",
          "name": "output_url",
      }, {
          "output_dir" : "train/db/",
          "name" : "aimrepo_url"
      }
      ]
      ,
      ...
      "job_description": "用户自定义Aim代码",
      ...
      "job_name": "ceshi2"
  }
  ```

4.点击`创建`按钮

一个仓库同时只能有一个运行中的训练实例，且训练实例最多只能5个

4.1查看训练列表

![训练列表](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lenet/quickstart_trainlist.png)

4.2查看训练日志

![训练日志](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lenet/quickstart_trainlog.png)

5.自动评估

- 评估方式1——训练日志可视化

  根据代码顺序输入Grid Search的超参数范围，注意为浮点数列表，为空时输入`[]`

  ```python
  # 训练代码
  def train(args_opt):
       # ablation experiments
      batch_size_choice = [32, 64, 128]
      learning_rate_choice = [0.01, 0.001, 0.0001]
      momentum_choice = [0.9, 0.99]
  
      for batch_size in batch_size_choice:
          for learning_rate in learning_rate_choice:
              for momentum in momentum_choice:
                  # 将模型参数存入parameter的字典中，这里加载的是上面训练过程中保存的模型参数
                  param_dict = load_checkpoint(args_opt.pretrain_url)
                  # 重新定义一个LeNet神经网络
                  network = lenet(num_classes=10, pretrained=False)
                  # 将参数加载到网络中
                  load_param_into_net(network, param_dict)
                  ...
  
  # 评估超参数范围输入
  batch_size: [32, 64, 128]
  learning_rate: [0.01, 0.001, 0.0001]
  momentum: [0.9, 0.99]
  ```

- 评估方式2——自定义评估

  点击 `自定义评估` 页签，若您满足自定义评估的必要条件，将会出现如下界面。

  ![自定义评估](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lenet/quickstart_customize.png)

> 注：在训练完成之后，才可进行评估功能，自定义评估的必要条件参考 <a href="">自定义评估</a>

5.1点击`开始评估`按钮

点击开始评估，按钮会转到评估中状态，此时按钮是不可用，且自定义评估方式等待时间会较长，请您耐心等待。

5.2查看报告

- 评估方式1——训练日志可视化

  点击查看报告，进入如下页面，您也可以在左侧导航栏右键打开一个新页面

  ![训练日志可视化](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lenet/quickstart_aim.png)

  点击左侧导航栏Runs，可以查看对比组列表。

  ![aim-Runs](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lenet/quickstart_aim_runs.png)

  点击某一个Runs，可以查看一种实验下的走势图。

  比如点击第一个Run，learning_rate为0.0001，momentum为0.99，batch_size 为128。

  选择`Metrics`页签，可以查看此超参数下不同监测指标的走势图。

  ![image-20220716204725462](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lenet/quickstart_aim_metrics.png)

  点击左侧导航栏Metrics，可以查看所有metrcis的走势图汇总

  ![aim-Metrics](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lenet/quickstart_aim_metricslist.png)

  点击左侧导航栏Params，可以查看对比图，可以直接看出哪个超参数下有最好的metrics。

  比如下图我们使用控制变量法，查看在batch_size为64，momentum为0.9时，哪个leanring_rate为那个loss最小。由下图可知，learning_rate为0.1时最小。

  ![aim-Parms](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lenet/quickstart_aim_params.png)

  > 注：若您想要获取更多监控指标，建议您自定义Aim代码，选择自定义评估的方式，详情参考 <a href="">自定义评估</a>

- 评估方式2——自定义评估

  此案例增加了一个测试数据集的acc，效果图如下：

  ![自定义评估](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lenet/quickstart_aim_customize.png)

  分析loss走势图，随着epoch的增加，loss反而往上，且在2.4左右反复震荡，可以猜测，loss陷入到了一个局部最优点，需要设置一个更大的learning_rate冲出局部最优点。

  由此得出一个简单的结论，可以设置一个更大的learning_rate、momentum或者选择自适应优化器等。

  若您要体验和评估方式1一样的对比效果的话，您需要更改如下:

  ```python
  def train(args_opt):
      # ablation experiments
      batch_size_choice = [32, 64, 128]
      learning_rate_choice = [0.01, 0.001, 0.0001]
      momentum_choice = [0.9, 0.99]
  
      for batch_size in batch_size_choice:
          for learning_rate in learning_rate_choice:
              for momentum in momentum_choice:
                  # 将模型参数存入parameter的字典中，这里加载的是上面训练过程中保存的模型参数
                  param_dict = load_checkpoint(args_opt.pretrain_url)
                  # 重新定义一个LeNet神经网络
                  network = lenet(num_classes=10, pretrained=False)
                  # 将参数加载到网络中
                  load_param_into_net(network, param_dict)
                  ...
  ```

  您需要注意的是此种方式生成报告的时间会很长，请耐心等待。

  

### 推理可视化

选择`推理`页签，点击`启动`按钮，启动过程会比较慢，请耐心等待，一般为5分钟以内，若时间过长，请检查推理代码。

MNIST画板效果展示

![image-20220716194713034](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lenet/quickstart_inference.png)



## 进阶操作

若你想在昇思大模型体验平台中从0到1创建自己的训练实例、评估和推理可视化，可以参考 <a href="">手把手教你实现AI全流程教程</a>



## 问题反馈

您如果按照教程操作过程中出现任何问题，您可以联系我们的邮箱`contact@mindspore.cn`，我们会及时回复您。如果您有任何建议，也可以添加官方助手小猫子（微信号：mindspore0328），我们非常欢迎您的宝贵建议，如被采纳，会受到MindSpore官方精美礼品哦！