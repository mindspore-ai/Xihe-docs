### 

### 如何在平台上实现自定义评估？

评估依赖于训练，需训练完成之后才能进行评估。若打印训练日志的`Monitor`采用的是[`LossMonitor`](https://www.mindspore.cn/vision/docs/zh-CN/r0.1/engine.html?highlight=lossmonitor#mindvision.engine.callback.LossMonitor)或者[`ValAccMonitor`](https://www.mindspore.cn/vision/docs/zh-CN/r0.1/engine.html?highlight=valaccmonitor#mindvision.engine.callback.ValAccMonitor)，则支持标准评估，只能可视化打印出来的指标，若要支持更多的评估指标，则可以选择自定义评估的方式。具体操作如下。

#### **1.适配的更改训练代码**

我们以官方的<a href="https://xihe.mindspore.cn/projects/MindSpore/lenet5_demo">MindSpore/lenet5_demo</a>为例，原训练代码参考[MindSpore初学入门——手写数字识别](https://www.mindspore.cn/tutorials/zh-CN/r1.7/beginner/quick_start.html)，在本例中我们以[MindSpore 自定义Callback](https://www.mindspore.cn/tutorials/zh-CN/r1.9/advanced/model/callback.html?highlight=%E8%87%AA%E5%AE%9A)+[Aim 跟踪指标](https://aimstack.readthedocs.io/en/latest/quick_start/supported_types.html#tracking-multiple-values) 的方式跟踪了每个epoch之后训练集和测试集的acc。

原训练代码

```python
#!/usr/bin/env python
# coding: utf-8

# # 快速入门：手写数字识别
from mindvision.dataset import Mnist
from mindvision.classification.models import lenet
import mindspore.nn as nn
from mindspore.train.callback import ModelCheckpoint, CheckpointConfig
from mindvision.engine.callback import LossMonitor
from mindspore.train import Model

def train()：
    # 下载并处理MNIST数据集
    download_train = Mnist(path="./mnist", split="train", batch_size=32, repeat_num=1, shuffle=True, resize=32, download=True)
    download_eval = Mnist(path="./mnist", split="test", batch_size=32, resize=32, download=True)
    dataset_train = download_train.run()
    dataset_eval = download_eval.run()

    # 定义LeNet网络
    network = lenet(num_classes=10, pretrained=False)
    # 定义损失函数
    net_loss = nn.SoftmaxCrossEntropyWithLogits(sparse=True, reduction='mean')
    # 定义优化器函数
    net_opt = nn.Momentum(network.trainable_params(), learning_rate=0.01, momentum=0.9)
    # 设置模型保存参数，模型训练保存参数的step为1875
    config_ck = CheckpointConfig(save_checkpoint_steps=1875, keep_checkpoint_max=10)
    # 应用模型保存参数
    ckpoint = ModelCheckpoint(prefix="lenet", directory="./lenet", config=config_ck)
    # 初始化模型参数
    model = Model(network, loss_fn=net_loss, optimizer=net_opt, metrics={'accuracy'})
    # 训练网络模型，并保存为lenet-1_1875.ckpt文件
    model.train(10, dataset_train, callbacks=[ckpoint, LossMonitor(0.01, 1875)])
```

适配后的代码

```python
import argparse

from mindvision.classification.dataset import Mnist
from mindvision.classification.models import lenet

import mindspore.nn as nn
from mindspore import load_checkpoint, load_param_into_net
from mindspore.train import Model
from mindspore.train.callback import ModelCheckpoint, CheckpointConfig
from mindspore.train.callback import Callback, LossMonitor

from aim import Run
import moxing as mox


def parse_args():
    # 创建解析
    parser = argparse.ArgumentParser(description="train mnist",
                                     formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    # 添加参数
    parser.add_argument('--pretrain_url', type=str, default='', help='the training data')
    parser.add_argument('--data_url', type=str, default='', help='the training data')
    parser.add_argument('--output_path', default='', type=str, help='the path model saved')
    parser.add_argument('--aim_repo', default='', type=str, help='the aim repo path')
    # 解析参数
    args_opt = parser.parse_args()
    return args_opt


# 自定义Callback
class AimCallback(Callback):
    def __init__(self, model, dataset_test, aim_run):
        super(AimCallback, self).__init__()
        self.aim_run = aim_run  # 传入aim实例
        self.model = model  # 传入model，用于eval
        self.dataset_test = dataset_test  # 传入dataset_test, 用于eval test

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

                # 定义损失函数
                net_loss = nn.SoftmaxCrossEntropyWithLogits(sparse=True, reduction='mean')
                # 定义优化器函数
                net_opt = nn.Momentum(network.trainable_params(), learning_rate=learning_rate, momentum=momentum)
                model = Model(network, loss_fn=net_loss, optimizer=net_opt, metrics={"accuracy"})

                # 定义训练数据集
                download_train = Mnist(path=args_opt.data_url, split="train", batch_size=batch_size, repeat_num=1, shuffle=True, resize=32,
                                       download=True)
                # 定义测试数据集
                download_eval = Mnist(path=args_opt.data_url, split="test", batch_size=batch_size, repeat_num=1, shuffle=True, resize=32,
                                      download=True)
                dataset_train = download_train.run()
                dataset_test = download_eval.run()

                # 设置模型保存参数
                config_ck = CheckpointConfig(save_checkpoint_steps=int(60000/batch_size), keep_checkpoint_max=20)

                # 应用模型保存参数
                ckpoint = ModelCheckpoint(prefix="lenet", directory=args_opt.output_url, config=config_ck)
                # Aim
                aim_run = Run(repo=args_opt.aim_repo, experiment=f"{args_opt.output_path}/bs{batch_size}_lr{learning_rate}_mt{momentum}")

                # Log run parameters
                aim_run['learning_rate'] = learning_rate
                aim_run['momentum'] = momentum
                aim_run['batch_size'] = batch_size
                
                # 训练网络模型
                model.train(2, dataset_train, callbacks=[ckpoint, AimCallback(model, dataset_test, aim_run)])


if __name__ == '__main__':
    args_opt = parse_args()
    train(args_opt)
```

注意为了适配自定义，你需要注意以下几个点：

- 需增加一个解析参数，且固定名为aim_repo，用于存储Aim跟踪数据集 repo path

  ```python
  parser.add_argument('--aim_repo', default='', type=str, help='the aim repo path')
  ```

- Aim repo必须指定在`args_opt.aim_repo`下，具体语法可参考[Aim Run](https://aimstack.readthedocs.io/en/latest/using/configure_runs.html#id2)

  ```python
  # Aim
  aim_run = Run(repo=args_opt.aim_repo)
  ```

- 更多Aim的用法请参考[Aim](https://aimstack.readthedocs.io/en/latest/quick_start/setup.html)



#### 2.创建`pip-requirements.txt`依赖文件

注意依赖文件名必须为`pip-requirements.txt`。因`mindvision`库依赖`opencv`，所以使用`mindvision`库时需要安装`opencv`。`aim`的版本建议指定为`3.8.1`

```python
mindspore
mindvision==0.1.0
opencv-contrib-python-headless==4.5.5.64
opencv-python==4.5.5.64
opencv-python-headless==4.5.5.64
aim==3.8.1
```



#### **3.创建项目仓库，并将训练代码上传到平台上**

本地项目代码目录结构（`pip-requirements.txt`和启动文件`train.py`必须在同一级）

```shell
.
└── train # 训练可视化相关代码
    └── trainDir # 训练代码
        ├── pip-requirements.txt # 训练相关依赖文件，必须和启动文件同一级
        ├── train.py # LossMonitor训练代码，支持标准评估
        └── train_customize_aim.py # 需要最新上传的自定义评估
```

建议将训练相关代码放在一个文件夹中。

接下来将本地代码上传到平台上，执行以下步骤：

- 创建项目仓库（若已存在项目仓库，则跳过此步骤）

  ![train_create_project](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/tutorial/train/train_create_project.png)

- 获取仓库克隆链接

  点击头像菜单栏的个人主页可以访问刚创建的项目仓库，打开项目仓库，点击下载按钮，复制clone链接 。

  ![train_clone_project](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/tutorial/train/train_clone_project.png)

- 将本地文件上传到云端仓库

  在本地的`terminal`或者`git bash`上执行以下命令

  ```shell
  # 1. 克隆仓库
  git clone https://xxx/xxx.git
  # 2. 进入到克隆后的仓库文件夹下，将代码复制到此文件夹下，注意不要放大文件（200KB）,否则会push失败。也不能上传lfs文件（即不可以git lfs track <大文件>）,否则会训练调度失败
  # 3. 将所有更改的文件放在暂存区
  git add .
  # 4. 将暂存区的文件上传到本地仓库
  git commit -m "xxx"
  # 5. 将本地仓库push到云端仓库，push成功之后建议在云端仓库检查文件是否上传成功
  git push
  ```

  **注**：第一次push需登录，用户名为平台用户名，密码为个人中心的token

  ![train_git_push](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/tutorial/train/train_git_push.png)



#### 4.创建模型仓库，将预训练文件上传到平台上

**（若平台上已有权重文件，可直接引用公开的模型文件创建训练实例，则可跳过此步）**

本地模型仓库目录结构

```shell
.
└── lenet-1_1875.ckpt # 权重文件
```

接下来将本地的权重文件上传到平台上，执行以下步骤：

- 创建模型仓库（若已存在模型仓库，则跳过此步骤）

  ![train_create_model](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/tutorial/train/train_create_model.png)

- 获取模型仓库链接

  点击头像菜单栏的个人主页可以访问刚创建的模型仓库，打开模型仓库，点击下载按钮，复制clone链接 。

- 将本地的预训练模型文件上传到平台上

  在本地的`terminal`或者`git bash`上执行以下命令，其中`Git LFS`操作请参考[[![全球 Web 图标](https://ts3.cn.mm.bing.net/th?id=ODLS.644a2101-4b8d-4161-a013-62f890a57b7e&w=16&h=16&o=6&pid=1.2)](https://git-lfs.github.com/)[Git Large File Storage](https://git-lfs.github.com/)]

  ```shell
  # 1. 克隆仓库
  git clone https://xxx/xxx.git
  # 2. 进入到克隆后的仓库文件夹下，并将权重文件复制到此文件夹下
  # 3. 标记大文件（超过200K）
  # # 安装git lfs，只要安装一次就行
  git lfs intall
  # # track大文件，注意后面为正则，比如下例中将.ckpt的文件标为大文件
  git lfs track "*.ckpt"
  # # 查看.gitattribute文件是否生成
  cat .gitattribute
  # 4. 将所有更改的文件放在暂存区
  git add .
  # 5. 将暂存区的文件上传到本地仓库
  git commit -m "xxx"
  # 6. 将本地仓库push到云端仓库，push成功之后建议在云端仓库检查文件是否上传成功
  git push
  ```



#### 5.创建数据集仓库，将数据集上传到平台上

（**若平台上有数据集，可直接引用公开的可支持协议下的数据集，则可跳过此步**）

本地数据集（[MNIST数据集](http://yann.lecun.com/exdb/mnist/)）仓库目录结构

```shell
.
├── test # 测试集
│   ├── t10k-images-idx3-ubyte 
│   └── t10k-labels-idx1-ubyte 
└── train # 训练集
    ├── train-images-idx3-ubyte
    └── train-lables-idx1-ubyte
```

接下来将本地的数据集上传到平台上，执行以下步骤：

- 创建数据集仓库（若已存在数据集仓库，则跳过此步骤）

  ![train_dataset_model](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/tutorial/train/train_create_dataset.png)

- 获取数据集仓库链接

  点击头像菜单栏的个人主页可以访问刚创建的数据集仓库，打开模型仓库，点击下载按钮，复制clone链接 。

- 将本地的数据集文件上传到平台上

  在本地的`terminal`或者`git bash`上执行以下命令，其中`Git LFS`操作请参考[[![全球 Web 图标](https://ts3.cn.mm.bing.net/th?id=ODLS.644a2101-4b8d-4161-a013-62f890a57b7e&w=16&h=16&o=6&pid=1.2)](https://git-lfs.github.com/)[Git Large File Storage](https://git-lfs.github.com/)]

  ```shell
  # 1. 克隆仓库
  git clone https://xxx/xxx.git
  # 2. 进入到克隆后的仓库文件夹下，并将数据集文件复制到此文件夹下
  # 3. 标记大文件（超过200K）
  # # 安装git lfs，只要安装一次就行
  git lfs intall
  # # track大文件，注意后面为正则，比如将ubyte的文件标为大文件
  git lfs track "*ubyte"
  
  # # 数据集仓库，很多时候需要标记文件夹，可参考以下标记文件夹的命令（以标记datasets下的所有文件为大文件lfs为例）
  # # 忽略文件夹中的所有文件(包含文件夹)
  git lfs track "datasets/**"
  # # 忽略文件夹中的文件(不包含文件夹)
  git lfs track "datasets/*"
  # # 查看.gitattribute文件是否生成
  cat .gitattribute
  
  # 4. 将所有更改的文件放在暂存区
  git add .
  # 5. 将暂存区的文件上传到本地仓库
  git commit -m "xxx"
  # 6. 将本地仓库push到云端仓库，push成功之后建议在云端仓库检查文件是否上传成功
  git push
  ```



#### 6.创建训练实例

返回刚创建的项目仓库，打开训练页签，点击创建训练实例按钮

![train_create_train](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/tutorial/train/train_create_train.png)

填写训练相关配置

![train_create_trainform](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/tutorial/eval/evlaution_create_train.png)



#### 7.查看训练列表和训练日志

查看训练列表

![train_trainlist](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/tutorial/train/train_trainlist.png)



#### 8.查看训练日志和详情

点击训练名称，查看日志

![train_log](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/tutorial/eval/evlaution_trainlog.png)



#### 9.自定义评估

点击开始评估

![自定义评估](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/tutorial/eval/evlaution_cuseval.png)

评估中需要1-5分钟，请耐心等待

![eval_loading](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/tutorial/eval/evlaution_loading.png)

评估成功，按钮变成查看报告

![eval_success](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/tutorial/eval/evlaution_success.png)

点击查看报告，可查看Aim 界面

![eval_aim](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/tutorial/eval/eval_aim.gif)



### Aim是什么？如何操作？

待补充...



### 问题反馈

您如果按照教程操作过程中出现任何问题，您可以联系我们的邮箱`contact@mindspore.cn`，我们会及时回复您。如果您有任何建议，也可以添加官方助手小猫子（微信号：mindspore0328），我们非常欢迎您的宝贵建议，如被采纳，会受到MindSpore官方精美礼品哦！

