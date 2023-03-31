[[toc]]



### 如何在平台上训练？

#### 1.适配的更改训练代码

出于对平台训练环境的安全考虑，平台不支持通过代码下载文件。只能引用平台上的模型和数据集仓库的文件或文件夹。

因此，训练代码需要做一些适配，即在训练代码中增加一个解析参数，用于预训练模型的文件位置、数据集的文件夹位置的输入，和权重文件或者输出图片等的输出。

我们以官方的<a href="https://xihe.mindspore.cn/projects/MindSpore/lenet5">MindSpore/lenet5</a>为例，原训练代码参考[MindSpore初学入门——手写数字识别](https://www.mindspore.cn/tutorials/zh-CN/r1.7/beginner/quick_start.html)

**原训练代码**

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

**适配后的代码**

```python
import os
import argparse

from mindvision.classification.dataset import Mnist
from mindvision.classification.models import lenet

import mindspore
import mindspore.nn as nn
from mindspore import load_checkpoint, load_param_into_net
from mindspore.train import Model
from mindspore.train.callback import ModelCheckpoint, CheckpointConfig
from mindvision.engine.callback import LossMonitor


def parse_args():
    # 创建解析
    parser = argparse.ArgumentParser(description="train mnist",
                                     formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    # 添加参数
    parser.add_argument('--pretrain_url', type=str, default='', help='the training data')
    parser.add_argument('--data_url', type=str, default='', help='the training data')
    parser.add_argument('--output_path', default='', type=str, help='the path model saved')
    # 解析参数
    args_opt = parser.parse_args()
    return args_opt


def train(args_opt):
    # 将模型参数存入parameter的字典中，这里加载的是上面训练过程中保存的模型参数
    param_dict = load_checkpoint(args_opt.pretrain_url)

    # 重新定义一个LeNet神经网络
    network = lenet(num_classes=10, pretrained=False)

    # 将参数加载到网络中
    load_param_into_net(network, param_dict)
    # 定义损失函数
    net_loss = nn.SoftmaxCrossEntropyWithLogits(sparse=True, reduction='mean')
    # 定义优化器函数
    net_opt = nn.Momentum(network.trainable_params(), learning_rate=0.01, momentum=0.9)
    model = Model(network, loss_fn=net_loss, optimizer=net_opt, metrics={"accuracy"})

    # 定义训练数据集
    download_train = Mnist(path=args_opt.data_url, split="train", batch_size=32, repeat_num=1, shuffle=True, resize=32,
                           download=True)
    dataset_train = download_train.run()

    # 设置模型保存参数
    config_ck = CheckpointConfig(save_checkpoint_steps=1875, keep_checkpoint_max=10)

    # 应用模型保存参数
    ckpoint = ModelCheckpoint(prefix="lenet", directory=args_opt.output_path, config=config_ck)

    # 训练网络模型
    model.train(10, dataset_train, callbacks=[ckpoint, LossMonitor(0.01, 1875)])


if __name__ == '__main__':
    args_opt = parse_args()
    train(args_opt)
```

比较俩个脚本，可以发现，其实就是增加一个`argparse`库对输入和输出进行了封装。这个库的作用简单来讲就是将原来`python train.py`的运行方式变成了可支持外部传参的`python train.py --pretrain_url xxx --data_url xxx --output_path xxx` 运行方式。

> 注：
>
> 1.输出的参数名固定为`output_path`，你可以将你想输出的文件存在此文件夹下，若你要多级保存，请在基于`args_opt.output_path`创建文件夹，再保存。
>
> ```python
> import os
> folder = os.path.join(args_opt.output_path , "new_folder")
> if not os.path.exists(folder):
>     os.makedirs(folder)
>     print(f"{folder}创建成功!")
> # 将文件保存在new_folder下，比如用ModelCheckpoint保存ckpt策略
> ckpoint = ModelCheckpoint(prefix="lenet", directory=folder,config=config_ck)
> ```
>
> 2.若要支持自定义评估，参数名为固定为`aim_repo`，更多自定义评估的操作参考[自定义评估]()



#### 2.创建`pip-requirements.txt`依赖文件

注意依赖文件名必须为`pip-requirements.txt`。因`mindvision`库依赖`opencv`，所以使用`mindvision`库时需要安装`opencv`

```python
mindspore
mindvision==0.1.0
opencv-contrib-python-headless==4.5.5.64
opencv-python==4.5.5.64
opencv-python-headless==4.5.5.64
```



#### 3.创建项目仓库，并将本地的训练代码上传到平台上

本地项目代码目录结构（`pip-requirements.txt`和启动文件`train.py`必须在同一级）

```shell
.
└── train # 训练可视化相关代码
    └── trainDir # 训练代码
        ├── pip-requirements.txt # 训练相关依赖文件，必须和启动文件同一级，名字不可以更改
        └── train.py # LossMonitor训练代码，支持标准评估，名字可自定义
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
  git clone https://source-xihe.mindspore.cn/<user>/<repo>.git
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
  git clone https://source-xihe.mindspore.cn/<user>/<repo>.git
  # 2. 进入到克隆后的仓库文件夹下，并将权重文件复制到此文件夹下
  # 3. 标记大文件（超过200K）
  # # 安装git lfs，只要安装一次就行
  git lfs install
  # # track大文件，注意后面为正则，比如下例中将.ckpt的文件标为大文件
  git lfs track "*.ckpt"
  # # 查看.gitattributes文件是否生成
  cat .gitattributes
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
  git clone https://source-xihe.mindspore.cn/<user>/<repo>.git
  # 2. 进入到克隆后的仓库文件夹下，并将数据集文件复制到此文件夹下
  # 3. 标记大文件（超过200K）
  # # 安装git lfs，只要安装一次就行
  git lfs install
  # # track大文件，注意后面为正则，比如将ubyte的文件标为大文件
  git lfs track "*ubyte"
  
  # # 数据集仓库，很多时候需要标记文件夹，可参考以下标记文件夹的命令（以标记datasets下的所有文件为大文件lfs为例）
  # # 忽略文件夹中的所有文件(包含文件夹)
  git lfs track "datasets/**"
  # # 忽略文件夹中的文件(不包含文件夹)
  git lfs track "datasets/*"
  # # 查看.gitattributes文件是否生成
  cat .gitattributes
  
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

![train_create_trainform](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/tutorial/train/train_create_trainform.png)



#### 7.查看训练列表和训练日志

查看训练列表

![train_trainlist](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/tutorial/train/train_trainlist.png)



#### 8.查看训练日志和详情

点击训练名称，查看日志

![train_log](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/tutorial/train/train_log.png)



#### 9.评估

![train_evaluate](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/tutorial/train/train_evaluate.png)

![train_eval_ok](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/tutorial/train/train_eval_ok.png)

![train_aim](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/tutorial/train/train_aim.png)

**注**：标准评估仅支持`LossMonitor`和`ValAccMonitor`，若要支持更多指标请参考自定义评估。



### 如何指定不同的训练版本？

目前平台支持的训练框架版本和规格，如下表：

| 训练框架  | device  | version                                               | 计算资源                                            |
| --------- | ------- | ----------------------------------------------------- | --------------------------------------------------- |
| MindSpore | GPU/CPU | mindspore_1.3.0-cuda_10.1-py_3.7-ubuntu_1804-x86_64   | GPU：1*NVIDIA-V100（32GB）\|CPU：8核 64GB 3200 GB   |
| MindSpore | Ascend  | mindspore_1.7.0-cann_5.1.0-py_3.7-euler_2.8.3-aarch64 | Ascend: 1*Ascend 910(32GB) \| ARM：24核 96GB 3200GB |

若要使用其他版本，需要重新安装新版本在基础镜像上做覆盖。注意系统、驱动、硬件版本是不能更改的，只能覆盖MindSpore的版本。

**覆盖新版本**

您可以通过在`pip-requirements.txt`上指定mindspore版本来覆盖原来的版本

- CPU版本

  ![安装CPU版本](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/tutorial/train/pip_cpu.png)

  上图在pip-requirements.txt上新增一行`mindspore`, 则会在启动训练镜像的时候会先`pip install mindspore`，不指定版本会默认安装最新的版本，当然你也可以指定你想要的版本。支持的版本请参考[MindSpore发布版本列表](https://www.mindspore.cn/versions)

- GPU版本

  平台支持CUDA版本是的CUDA10.2，所以请选择CUDA10.1的完整包。安装包链接参考[MindSpore安装](https://www.mindspore.cn/install)

  注意不要通过`pip install mindspore-gpu==<VERSION>`的方式安装，1.3.0及以上版本升级时，默认选择CUDA11版本。详情请参考[ pip方式安装MindSpore GPU版本](https://gitee.com/mindspore/docs/blob/master/install/mindspore_gpu_install_pip.md)

  ![安装GPU版本](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/tutorial/train/pip_gpu.png)

- Ascend版本

  由于MindSpore版本与CANN包版本强依赖，Ascend版本暂不支持以上方法覆盖版本。

**检查是否安装成功**

可以正在训练代码中打印当前版本

```python
import mindspore
print(mindspore.run_check())
```





### 问题反馈

您如果按照教程操作过程中出现任何问题，您可以联系我们的邮箱`contact@mindspore.cn`，我们会及时回复您。如果您有任何建议，也可以添加官方助手小猫子（微信号：mindspore0328），我们非常欢迎您的宝贵建议，如被采纳，会受到MindSpore官方精美礼品哦！
