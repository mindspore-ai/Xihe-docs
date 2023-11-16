[[toc]]

# &#x1F449;5分钟快速体验AI全流程开发     

在此教程中，我们将通过fork样例仓 <a href ="https://xihe.mindspore.cn/projects/MindSpore/lenet5">MindSpore/lenet5</a>，快速体验在昇思大模型平台实现AI全流程开发——训练、推理和评估。

## 目录
- [基本介绍](#基本介绍)
- [LeNet描述](#Lenet描述)
- [模型架构](#模型架构)
- [任务简介](#模型架构)
- [效果展示](#效果展示)
- [快速开始](#快速开始)
- [Fork样例仓](#Fork样例仓)
- [训练与评估](#训练与评估)
- [推理可视化](#推理可视化)
- [进阶操作](#进阶操作)
- [问题反馈](#问题反馈)

## 基本介绍

### LeNet描述

LeNet是1998年提出的一种典型的卷积神经网络。它被用于数字识别并取得了巨大的成功。

[论文](https://gitee.com/link?target=https%3A%2F%2Fieeexplore.ieee.org%2Fdocument%2F726791)： Y.Lecun, L.Bottou, Y.Bengio, P.Haffner.Gradient-Based Learning Applied to Document Recognition.*Proceedings of the IEEE*.1998.

### 模型架构

LeNet非常简单，包含5层，由2个卷积层和3个全连接层组成。

![image0](https://mindspore-website.obs.cn-north-4.myhuaweicloud.com/website-images/r1.7/tutorials/source_zh_cn/beginner/images/lenet.png)

### 任务简介

基于公开的模型仓库 <a href ="https://xihe.mindspore.cn/projects/MindSpore/lenet5">MindSpore/lenet_mnist</a> 下的MindSpore预训练文件 `lenet-1_1875.ckpt` 和公开的数据集 <a href="https://xihe.mindspore.cn/datasets/drizzlezyk/mnist">drizzlezyk/mnist</a> 实现迁移学习，在昇思大模型平台体验训练、评估和推理可视化全流程AI开发体验。

**项目地址**

- 预训练模型：<a href="https://xihe.mindspore.cn/models/MindSpore/lenet_mnist">MindSpore/lenet_mnist</a>
- 数据集：<a href="https://xihe.mindspore.cn/datasets/drizzlezyk/mnist">drizzlezyk/mnist</a>
- 项目：<a href="https://xihe.mindspore.cn/projects/MindSpore/lenet5">MindSpore/lenet5</a>

<a id="dir">**目录结构**</a>

```shell
.
├── inference # 推理可视化相关代码
│   ├── app.py # 推理核心启动文件
│   ├── config.json # 推理权重文件配置
│   └── requirements.txt # 推理可视化相关依赖文件
└── train # 训练可视化相关代码
    ├── pip-requirements.txt # 训练相关依赖文件，必须和启动文件同一级
    ├── train_customize_aim.py # 自定义Aim训练代码，支持自定义评估
    ├── train_gridsearch.py # grid search + LossMonitor 训练代码，支持标准评估
    |── train_valaccmonitor.py # ValAccMonitor训练代码，支持标准评估
    └── train.py # LossMonitor训练代码，支持标准评估
```

> 注：建议将推理可视化相关的代码放在`inference`文件夹下，训练相关的代码放在`train`文件夹下。注意该项目下不能有lfs文件，否则会调度失败。


## 效果展示

### 训练

训练列表

![训练列表](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lenet/effect_trainlist.png)

训练日志

![训练日志](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lenet/effect_log.png)
### 评估

![aim评估](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lenet/effect_metrics.png)

由上图可知，同样的轮次，当batch_size为64，momentum为0.9时，leanring_rate为0.1的loss最小

### 推理

![训练推理](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lenet/effect_inference.png)


## 快速开始

### Fork 样例仓

1.在项目搜索页中，搜索样例仓 <a href ="https://xihe.mindspore.cn/projects/MindSpore/lenet5">MindSpore/lenet5</a>，或直接点击链接。


2.点击Fork



### 训练与评估

1.选择不同的评估方式，您需要适配的更改训练文件（训练代码在[train/](https://xihe.mindspore.cn/projects/MindSpore/lenet5/tree/train/)下）。

- 评估方式1——训练日志可视化

```python
# train.py，支持标准评估
...
from mindvision.engine.callback import LossMonitor
...
# 训练网络模型
model.train(10, dataset_train, callbacks=[ckpoint, LossMonitor(0.01, 1875)])
...
```



```python
# train_gridsearch.py，支持标准评估
...
# 训练代码
def train(args_opt):
# grid search
batch_size_choice = [32, 64, 128]
learning_rate_choice = [0.01, 0.001, 0.0001]
momentum_choice = [0.9, 0.99]
for batch_size in batch_size_choice:
for learning_rate in learning_rate_choice:
for momentum in momentum_choice:
...
# LossMonitor or ValAccMonitor
model.train(20, dataset_train, callbacks=[ckpoint, LossMonitor(learning_rate, steps)])
...
```

- 评估方式2——自定义评估

评估方式1的评估指标有限，你也可以自己写评估代码，跟踪你想要关注的指标。比如下例train_customize_aim.py中以[自定义Callback](https://www.mindspore.cn/tutorials/zh-CN/r1.9/advanced/model/callback.html?highlight=%E8%87%AA%E5%AE%9A)+[Aim 跟踪指标](https://aimstack.readthedocs.io/en/latest/quick_start/supported_types.html#tracking-multiple-values) 的方式跟踪每个epoch之后训练集和测试集的acc。

```python
# train_customize_aim.py
...
from aim import Run
...
# 自定义Callback
class AimCallback(Callback):
def __init__(self, model, dataset_test, aim_run):
super(AimCallback, self).__init__()
self.aim_run = aim_run # 传入aim实例
self.model = model # 传入model，用于eval
self.dataset_test = dataset_test # 传入dataset_test, 用于eval test
def step_end(self, run_context):
"""step end"""
cb_params = run_context.original_args()
# loss
epoch_num = cb_params.cur_epoch_num
step_num = cb_params.cur_step_num
loss = cb_params.net_outputs
run1 = self.aim_run.track(float(str(loss)), name='loss', step=step_num, epoch=epoch_num,
context={"subset": "train"})
def epoch_end(self, run_context):
"""epoch end"""
cb_params = run_context.original_args()
# loss
epoch_num = cb_params.cur_epoch_num
step_num = cb_params.cur_step_num
loss = cb_params.net_outputs
train_dataset = cb_params.train_dataset
train_acc = self.model.eval(train_dataset)
test_acc = self.model.eval(self.dataset_test)
print("【Epoch:】", epoch_num, "【Step:】", step_num, "【loss:】", loss, "【train_acc:】", train_acc['accuracy'], "【test_acc:】",
test_acc['accuracy'])
self.aim_run.track(float(str(loss)), name='loss', epoch=epoch_num, context={"subset": "train"})
self.aim_run.track(float(str(train_acc['accuracy'])), name='accuracy', epoch=epoch_num,
context={"subset": "train"})
self.aim_run.track(float(str(test_acc['accuracy'])), name='accuracy', epoch=epoch_num,
context={"subset": "test"})
...
# Aim
aim_run = Run(repo=args_opt.aimrepo_url, experiment=f{args_opt.output_url}/bs{batch_size}_lr{learning_rate}_mt{momentum}")
# Log run parameters
aim_run['learning_rate'] = learning_rate
aim_run['momentum'] = momentum
aim_run['batch_size'] = batch_size
# 训练网络模型
model.train(2, dataset_train, callbacks=[ckpoint, AimCallback(model, dataset_test, aim_run)])
...
```

2.选择`训练`页签，点击`创建训练实例`按钮

![创建训练实例](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lenet/create-button.PNG)

**注**：一个仓库同时只能有一个运行中的训练实例，且训练实例最多只能5个

3.填写相关配置


![创建训练实例](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lenet/train-form.PNG)

4.查看训练列表和训练日志

4.1查看训练列表

![训练列表](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lenet/effect_trainlist.png)

4.2点击训练名称查看训练日志

![训练日志](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lenet/quickstart_trainlog.png)

点击日志文件或训练输出可以下载输出的日志和训练输出。


### 推理可视化

选择`推理`页签，点击`启动`按钮，启动过程会比较慢，请耐心等待，一般为5分钟以内，若时间过长，请检查推理代码。

MNIST画板效果展示

![image-20220716194713034](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/quick_start/lenet/quickstart_inference.png)


## 进阶操作

若你想在昇思大模型平台中从0到1创建自己的训练实例、评估和推理可视化，可以参考教程篇的内容


## 问题反馈

您如果按照教程操作过程中出现任何问题，您可以联系我们的邮箱`contact@mindspore.cn`，我们会及时回复您。如果您有任何建议，也可以添加官方助手小猫子（微信号：mindspore0328），我们非常欢迎您的宝贵建议，如被采纳，会受到MindSpore官方精美礼品哦！
