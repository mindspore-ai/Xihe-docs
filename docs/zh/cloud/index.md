[[toc]]

# Jupyter操作文档

## 1. 使用须知

> - 因一些原因，`jupyter`运行实例固定只能运行2个小时。**2个小时之后将会自动释放所有资源，请提前将所需资源下载到本地或git push到平台中**。
> - 本平台是开放的学习平台，禁止使用本平台进行商业用途和非法用途，一旦发现将依法追究。

此开发环境是使用的是`Jupyter Lab 3.x`，并集成了丰富的实用插件。您可以在`Jupyter Lab`上灵活运行调试代码和编写文档，`Jupyter Lab`集成了很多编辑器，例如 `Jupyter` 笔记本、文本编辑器、终端和自定义组件。更多的详细介绍你可以查看 [JupyterLab官网文档介绍](https://jupyterlab.readthedocs.io/en/stable/getting_started/overview.html#overview)。
    
接下来跟我来一起探索`Jupyter Lab`吧❗

## 2.  定制化Jupyter

### 设置主题

设置`Jupyter`的主题：

![theme](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/cloud/jupyter-theme.png)

设置`Terminal`的主题：

![jupyter-dark-theme](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/cloud/jupyter-dark-theme.png)

比如将`Terminal`设置成`Dark`，效果如下：

![terminal-dark](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/cloud/jupyter-terminal1.png)

### 显示代码行数

打开`Line Numbers`，方便用于调试。

![line numbers](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/cloud/jupyter-line_nums.png)

### 设置语言

设置界面的语言，默认为英文。

![language](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/cloud/jupyter-language.png)

### 更多设置

![more-settings](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/cloud/jupyter-settings.png)



## 3. 认识Jupyter界面

![image-20230328012316774](https://typora-asserts-1255664287.cos.ap-guangzhou.myqcloud.com/filesimage-20230328012316774.png)

> 注：在文件管理模块中，删除文件有些问题，你可以在4中打开terminal，通过命令删除。



## 4. 初用Jupyter

最好的学习方式就是实践，在文件列表中选择`demo.ipynb`, 快速体验`jupyter`的基本功能。

### 运行

![code-runn](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/cloud/jupyter-run.png)

> 注：`jupyter`的执行顺序很重要。很多时候发现运行结果于预期不符，就是因为`jupyter`执行错乱导致的。

### 调试

Jupyter lab内置了debugger功能，您需要先打开Line Number，然后打开debug按钮，打断点，然后运行项目。最后再右边菜单栏是对应调试功能。

![debug](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/cloud/jupyter-debug.png)

### 格式化

您可以点击Formatter按钮对您的代码进行格式化。

![formatter](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/cloud/jupyter-formatter.png)

### 查看源码

首先你需要打开Contextual Help，然后运行代码，在鼠标选中需要查看源码的类或函数等。在Contextual Help就会出现相应源码。

![contextual](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/cloud/jupyter-contextual.png)

![source-code](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/cloud/jupyter-contextual-code.png)



## 5. 使用Jupyter Terminal

有时候有些操作，图像化界面操作有问题，你可以打开Terminal试一试。

![launcher-terminal](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/cloud/jupyter-terminal-launcher.png)

![terminal](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/cloud/jupyter-terminal.png)



## 6. 使用Jupyter Markdown

您可以再Notebook上写Markdown

![markdown](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/cloud/jupyter-markdown1.png)

您也可以自己创建一个Markdown文件

![markdown2](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/cloud/jupyter-markdown2.png)



## 7. 上传下载文件

### 上传文件到Jupyter

方式1：目前平台暂不支持上传大文件。您需要将文件上传到平台，详情请参考[仓库文件操作](https://xihe-docs.mindspore.cn/zh/tutorial/repo/)。

比如我将模型文件上传到1.1G的bert模型上传到了[tokcls_bert_base_chineses_cluener](https://xihe.mindspore.cn/models/MindSpore/tokcls_bert_base_chineses_cluener/tree)仓中，
在terminal中执行`git clone https://source-xihe.mindspore.cn/MindSpore/tokcls_bert_base_chineses_cluener.git`就可以下载。

![克隆](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/cloud/jupyter-upload.png)

方式2（推荐）：可以将在本地将文件上传到华为云OBS上，然后在`terminal`中通过或者`wget`下载。

![wget](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/cloud/jupyter-wget.png)

方式3：对于小文件，比如`txt`文本文件，你可以直接拖拽到文件区。

![上传](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/cloud/jupyter-file-upload.png)


### 下载文件到Jupyter

方式1（推荐）：将文件上传到OBS中。用OBS作为一个存储中转站，详情请参考[obsutil_linux_amd64的下载和使用](https://support.huaweicloud.com/utiltg-obs/obs_11_0003.html)。

方式2：对于模型文件或者相关文件您可以选用此方式，你可以将更新的模型文件上传到模型库中。详情请参考[仓库文件操作](https://xihe-docs.mindspore.cn/zh/tutorial/repo/)。

方式3：对于小文件，你可以直接选择文件点击下载。

![下载](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/projects/cloud/jupyter-download.png)



## 8. 快捷键附录

### 模式介绍

在 `Jupyter Lab` 的 Notebook 中有两种模式，分别是编码模式（Edit mode）和命令模式（Command mode）。编码模式就是光标在 code 栏中闪烁时的模式，而命令模式就是点击 code 栏中括号后，code 栏变成灰色时的模式。

- 在编码模式下可以通过按 `Esc` 键进入命令模式
- 在命令模式下可以通过按 `Enter` 键进入编码模式

### 常用快捷键

选中cell或者在cell中按`ESE`按键进入到命令模式，再执行以下快捷键

| 快捷键          | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| `Ctrl + Enter`  | 运行本栏代码，保持在本栏并进入命令模式                       |
| `Shift + Enter` | 运行本栏代码，跳到下一栏并进入命令模式                       |
| `Alt + Enter`   | 运行本栏代码，跳到下一栏并进入编辑模式                       |
| `a`             | 在本栏代码前增加一栏，并跳到新增加的一栏，仍处在命令模式下   |
| `b`             | 在本栏代码后增加一栏，并跳到新增加的一栏，仍处在命令模式下   |
| `dd`            | 删除本代码栏，并自动跳到下一栏代码栏，仍处在命令模式下       |
| `m`             | 切换到 Markdown 模式，仍处在命令模式下，按下 Enter 可进入编辑模式 |
| `y`             | 切换到 Code 模型，仍处在命令行模式下，按下 Enter 可进入编辑模式 |