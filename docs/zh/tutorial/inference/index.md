[[toc]]



### 如何在平台上在线推理？

#### 1.推理代码

我们以官方的<a href="https://xihe.mindspore.cn/projects/MindSpore/lenet5">MindSpore/lenet5</a>为例，原推理代码参考[MindSpore初学入门——手写数字识别](https://www.mindspore.cn/tutorials/zh-CN/r1.7/beginner/quick_start.html)

**原推理代码**

```python
#!/usr/bin/env python
# coding: utf-8

# # 快速入门：手写数字识别
from mindvision.dataset import Mnist
from mindvision.classification.models import lenet
import numpy as np
from mindspore import Tensor
import matplotlib.pyplot as plt
from mindspore import load_checkpoint, load_param_into_net


# 定义LeNet网络
network = lenet(num_classes=10, pretrained=False)
# 加载已经保存的用于测试的模型
param_dict = load_checkpoint("./lenet/lenet-1_1875.ckpt")
# 加载参数到网络中
load_param_into_net(network, param_dict)
# 使用函数model.predict预测image对应分类
output = model.predict(Tensor(data['image']))
predicted = np.argmax(output.asnumpy(), axis=1)

# 输出预测分类与实际分类
print(f'Predicted: "{predicted}", Actual: "{labels}"')
```

**结合gradio后的代码**

```python
import cv2
import numpy as np
import gradio as gr

from mindspore import load_checkpoint, load_param_into_net
from mindspore import Tensor
from mindvision.classification.models import lenet
from mindspore.train import Model
from mindspore.nn import Softmax


NUM_CLASS = 10

def predict_digit(img):
    # 加载网路
    # 将模型参数存入parameter的字典中
    param_dict = load_checkpoint("./best.ckpt")

    # 重新定义一个LeNet神经网络,注意输入是32*32，loss采用的是SoftmaxCE
    network = lenet(num_classes=NUM_CLASS, pretrained=False)
    # 将参数加载到网络中
    load_param_into_net(network, param_dict)
    model = Model(network)
    
    # 处理图片,转化为 N，C，H,W
    img = cv2.resize(img, (32, 32))
    img = img.astype(np.float32)
    img = img / 255
    img = img.reshape((1, 1, 32, 32))
    
    #预测
    predict_score = model.predict(Tensor(img)).reshape(-1)
    predict_probability = Softmax()(predict_score)
    
    return {str(i): predict_probability[i].asnumpy().item() for i in range(NUM_CLASS)}

gr.Interface(fn=predict_digit, 
             inputs="sketchpad", 
             outputs=gr.outputs.Label(num_top_classes=NUM_CLASS, label="预测类别"),
             live=False,
             css=".footer {display:none !important}",
             title="0-9数字画板",
             description="画0-9数字",
             thumbnail="https://raw.githubusercontent.com/gradio-app/real-time-mnist/master/thumbnail2.png").launch()
```

简单来讲，gradio提供了一个对推理接口的交互式界面。用户可以在gradio页面上在线体验模型推理的效果。比如上例中，`gr.Interface().launch()`会生成一个web ui，输入一个是一个画板，输出的是一个Top N的分类分数条。点击summit按钮（推理按钮）则会调用自定义函数`predict_digit`函数，并将画板的画的图片传入到`predict_digit`函数，函数返回结果将会渲染到输出框中。

Gradio快速入门请参考[Gradio快速入门](https://www.gradio.app/getting_started/)，更多的Gradio Interface请参考[Gradio 文档](https://www.gradio.app/docs/)。



#### 2.创建`config.json`文件

平台不支持将权重文件上传到项目仓库，所以你需要将权重文件上传到模型仓库中。并通过`config.json`来配置，格式样例为

```json
{
	"model_path":["<user>/<repo_name>/<...>/xxx.ckpt"]
}
```

配置文件的`key`必须为`model_path`。`value`值是一个数组或列表，表示需要加载的模型下公开的权重文件，具体到仓库的文件路径。

配置此参数，推理服务启动的时候会自动将该**`user`**下的`repo_name`的仓库下的`xxx/xxx.ckpt`文件下载到同级，且名字就为`xxx.ckpt`，所以加载权重文件的时候直接基于本地路径加载就行。

在此案例中，`config.json`为下：

```json
{
	"model_path":["MindSpore/lenet_mnist/best.ckpt"]
}
```

表示是需要加载的权重文件是`MindSpore`下的`lenet_mnist`仓库下的`best.ckpt`文件。在启动推理的时候，会将该文件下载到`inference`文件夹下，所以使用时直接本地引用。比如在加载代码中`load("./best.ckpt")`



#### 3.创建`requirements.txt`依赖文件

注意依赖文件名必须为`requirements.txt`。因`mindvision`库依赖`opencv`，所以使用`mindvision`库时需要安装`opencv`。如果报找不到`jinja2 module`的ERROR，则在依赖文件中加上`jinja2`再重试。

```python
mindspore==1.8.1
mindvision==0.1.0
```



#### 4.创建项目仓库，将推理代码上传到平台上

本地项目推理代码目录结构（`requirements.txt`、配置文件`config.json`和启动文件`app.py`必须在同一级）

```shell
└─inference
	├─app.py            # 核心启动文件，名字不可更改
	├─config.json       # 推理权重文件配置，名字不可更改
	...
	└─requirments.txt	# 依赖文件，名字不可更改
```

注意需要将推理相关代码放在`inference`文件夹下。

接下来将本地代码上传到平台上，执行以下步骤：

- 创建项目仓库（若已存在项目仓库，则跳过此步骤）

  ![train_create_project](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/tutorial/train/train_create_project.png)

- 获取仓库克隆链接

  点击头像菜单栏的个人主页，进入个人主页，打开需要上传推理代码的项目仓库，点击文件页签的下载按钮，复制clone链接 。

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



#### 5.创建模型仓库，将指标最好的权重文件上传到平台上

本地模型仓库目录结构

```shell
.
└── xxx.ckpt # 训练最好的权重文件
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



#### 6.启动推理服务

打开推理页签，点击启动

![gradio_start](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/tutorial/inference/gradio_start.png)

大概需要加载1-5分钟，启动中，请耐心等待

![gradio_waitgradio_wait](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/tutorial/inference/gradio_wait.png)

运行成功

![gradio_success](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/tutorial/inference/gradio_success.gif)



### 推理启动失败或者报ERROR该怎么办？

如果出现启动失败或者报`ERROR`的错误，可以通过以下几个步骤检查

1. 可考虑推理代码有`BUG`。如果是启动失败，请检查主程序；如果是点击推理按钮报`ERROR`往往是因为回调函数（也就是推理函数）报错，请检查推理函数相关代码。
2. 建议在本地调试成功再上传到平台。平台的推理日志显示我们也会持续优化。
3. 若本地调试可以执行成功，但是云端还是启动失败或者报`ERROR`，可逐一检查
   - 核心启动文件名必须为`app.py`，依赖文件必须为`requirements.txt`，引用配置文件必须为`config.json`
   - 权重文件只能通过`config.json`方式引用，`key`值为`model_path`，值为一个模型权重文件路径列表，路径格式为`<user>/<repo>/<file_path>`
   - 项目仓库底下不应该存在`lfs`文件
4. 若按照平台要求还是报`ERROR`请及时反馈。详见[问题反馈](#feedback)。



### 平台推理镜像内置的依赖有哪些?

```shell
gradio
mindspore
opencv-python
opencv-python-headless
opencv-contrib-python
opencv-contrib-python-headless
jinja2
numpy
pandas
matplotlib
mindvision
esdk-obs-python==3.21.4
```





### <a id="feedback">问题反馈</a>

您如果按照教程操作过程中出现任何问题，您可以联系我们的邮箱`contact@mindspore.cn`，我们会及时回复您。如果您有任何建议，也可以添加官方助手小猫子（微信号：mindspore0328），我们非常欢迎您的宝贵建议，如被采纳，会受到MindSpore官方精美礼品哦！