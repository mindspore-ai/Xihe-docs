[[toc]]

# 仓库文件操作

更新时间：2022-11-23

 **目录**

- 仓库文件操作
  - [Git操作环境准备](#Git操作环境准备)
    - [设置用户名与邮箱](#设置用户名与邮箱)
    - [Token密码的获取](#Token密码的获取)
    - [查看当前用户名和邮箱](#查看当前用户名和邮箱)
    - [修改用户名、密码、邮箱信息](#修改用户名、密码、邮箱信息)
  - [项目仓的Git操作](#项目仓的Git操作)
    - [Git克隆个人项目](#Git克隆个人项目)
    - [Git lfs操作大文件](#Git lfs操作大文件)
    - [Git克隆他人项目](#Git克隆他人项目)
  - [模型仓的Git操作](#模型仓的Git操作)
    - [Git克隆个人模型](#Git克隆个人模型)
    - [Git克隆他人模型](#Git克隆他人模型)
  - [数据集的Git操作](#数据集的Git操作)
    - [Git克隆个人数据集](#Git克隆个人数据集)
    - [Git克隆他人数据集](#Git克隆他人数据集)

## Git操作环境准备

#### 设置用户名与邮箱

当你安装Git后首先要做的事情是设置你的用户名称和e-mail地址。这是非常重要的，因为每次Git提交都会使用该信息。它被永远的嵌入到了你的提交中：

```python
git config --global user.name "***"  #名称
git config --global user.email ****@qq.com   #邮箱
git config --global user.password "123456(新的密码)密码为Token密码"
```

#### Token密码的获取

个人设置下的账户安全按钮找到TOKEN密码：

![WechatIMG494](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG693.png)

#### 查看当前用户名和邮箱

```python
git config user.name "查看用户名"
git config user.email ""
```

#### 修改用户名、密码、邮箱信息

```python
git config --global user.name "zhangsan(新的用户名)"
git config --global user.email "123456@qq.com(新的邮箱)"
git config --global user.password "123456(新的密码)"
```

这里的zhangsan和邮箱都是你修改之后的用户名和邮箱

## 项目仓的Git操作

#### Git克隆个人项目

点击个人主页->项目->进入项目界面->项目卡片->点击克隆。

![image-20221108142659121](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG629.jpeg)

点击项目按钮，进入个人项目，点击自己的项目卡片。

![image-20221108142827031](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/6441668149857_.pic.jpg)

点击文件按钮，进行Git克隆页面。

![image-20221108143721512](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/6451668150854_.pic.jpg)

点击克隆按钮，得到Git克隆当前仓库的链接：

```python
https://source-xihe.test.osinfra.cn/Mindspore/project-mnist-test.git。
```

![image-20221108155837102](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/6461668151043_.pic.jpg)

打开终端，Git克隆链接到指定路径。

```python
#操作：git clone 链接
git clone https:// "https://source-xihe.test.osinfra.cn/Mindspore/project-mnist-test.git。"
```

![WechatIMG495](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG630.png)

您可以选择直接在终端上对文件修改，或到对应的路径下对文件修改。

操作：

```python
git commit -m "自定义命名"
git push
```

![WechatIMG494](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG625.jpeg)

#### Git lfs操作大文件

您可以使用git lfs：在操作前请注意是否有[git lfs](https://www.jianshu.com/p/493b81544f80)工具。

- git lfs操作参考[[![全球 Web 图标](https://ts3.cn.mm.bing.net/th?id=ODLS.644a2101-4b8d-4161-a013-62f890a57b7e&w=16&h=16&o=6&pid=1.2)](https://gitee.com/link?target=https%3A%2F%2Fgit-lfs.github.com%2F)[Git Large File Storage](https://gitee.com/link?target=https%3A%2F%2Fgit-lfs.github.com%2F)]

  ```python
  # 安装git lfs，只要安装一次就行
  git lfs intall
  # track大文件，注意后面为正则，比如将.ckpt的文件标为大文件
  git lfs track "*.ckpt"
  # 查看.gitattribute文件是否生成
  cat .gitattribute
  ```

- git add文件，将文件放在暂存区

  ```python
  # 在文件夹最顶层
  git add .
  ```

- git commit -m ""，将文件从暂存区上传到本地仓库

  ```python
  git commit -m "<MESSAGE>"
  ```

- git push，将本地仓库push到远程仓库

  ```python
  git push
  ```

```python
git lfs track *."文件类型的后缀"(如txt、png、等)
```

![image-20221106100158854](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/7261668650008_.pic.jpg)

将文件推到代码仓

```python
git add .
git commit -m "自定义命名"
git push
```

![WechatIMG494](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG625.jpeg)

成功后上传的文件右侧会出现LFS的字样

![image-20221106100158854](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/7311668668381_.pic.jpg)

#### Git克隆他人项目

您可以点击导航栏项目按钮->点击该用户项目卡片->进入该用户项目页面。

![image-20221106100158854](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG633.png)

接下来的步骤同上面Git克隆当前链接到指定路径修改或者直接Fork到你的项目里面。

![image-20221106100817475](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG634.png)

## 模型仓的Git操作

#### Git克隆个人模型

点击个人主页->模型，进入模型界面->文件->点击克隆。

点击模型按钮，进入个人的模型卡片。

![image-20221108142827031](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG635.png)

点击文件可以对模型进行Git克隆。

![image-20221108142827031](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG636.png)

点击克隆按钮可以对模型进行Git克隆的操作。

![image-20221108142827031](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG637.png)

#### Git克隆他人模型

您可以点击该用户模型卡片

![image-20221108142827031](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG638.png)

Git克隆链接如下，其他操作与项目仓Git操作类似。

```python
git clone https://source-xihe.test.osinfra.cn/wesley/lenet_mnist.git
```

![WechatIMG495](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG637.png)

## 数据集的Git操作

#### Git克隆个人数据集

点击个人主页->数据集->进入数据集界面->文件->点击克隆。

点击数据集按钮，进入自己的数据集卡片。

`注`：只有个人代码仓可以push，他人代码仓只能克隆

![image-20221108142827031](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG639.png)

点击文件可以对数据集进行Git克隆。

`注`：只有个人代码仓可以push，他人代码仓只能克隆

![image-20221108142827031](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG640.png)

点击克隆按钮可以对数据集进行Git克隆的操作。

`注`：只有个人代码仓可以push，他人代码仓只能克隆

![image-20221108142827031](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG641.png)

#### Git克隆他人数据集

您可以导航栏模型按钮->选择用户数据集卡片->进入数据集。

`注`：只有个人代码仓可以push，他人代码仓只能克隆

![image-20221108142827031](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG638.png)

Git克隆链接，其余操作与项目Git操作类似。

`注`：只有个人代码仓可以push，他人代码仓只能克隆

![WechatIMG495](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG642.png)



