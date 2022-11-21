[[toc]]

# 仓库文件操作

更新时间：2022-11-15

 **目录**

- 仓库文件操作
  - [git操作环境准备](#git操作环境准备)
  - [git项目仓](#项目)
  - [git模型仓](#模型)
  - [git数据集](#数据集)

## git操作环境准备

设置用户名与邮箱（必要）

1. 当你安装Git后首先要做的事情是设置你的用户名称和e-mail地址。这是非常重要的，因为每次Git提交都会使用该信息。它被永远的嵌入到了你的提交中：

   ```python
   git config --global user.name "***"  #名称
   git config --global user.email ****@mail.com   #邮箱
   ```
   
   Token密码的获取：个人设置下的账户安全按钮找到TOKEN密码。
   
   ![WechatIMG494](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG693.png)
   
2. 查看当前用户名和邮箱

```python
git config user.name "查看用户名"
git config user.email ""
```

修改：

```python
git config --global user.name "zhangsan(新的用户名)"
git config --global user.email "123456@qq.com(新的邮箱)"
git config --global user.password "123456(新的密码)"
```

这里的zhangsan和邮箱都是你修改之后的用户名和邮箱

## git项目仓

项目仓：

Git克隆个人项目：

点击个人主页->项目，进入项目界面->项目卡片->点击克隆。

![image-20221108142659121](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG629.jpeg)

点击项目按钮，进入个人项目，点击自己的项目卡片。

![image-20221108142827031](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/6441668149857_.pic.jpg)

点击文件按钮，进行git克隆页面。

![image-20221108143721512](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/6451668150854_.pic.jpg)

点击克隆按钮，得到git clone当前仓库的链接。

![image-20221108155837102](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/6461668151043_.pic.jpg)

打开终端，git clone 链接到指定路径。

操作：

```python
git clone https:// "链接"
```

![WechatIMG495](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG630.png)

您可以选择直接在终端上对文件修改，或到对应的路径下对文件修改。

操作：

```python
git commit -m "自定义命名"
git push
```

![WechatIMG494](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG625.jpeg)

操作大文件，您可以使用git-lfs：在操作前请注意是否有[git-lfs](https://www.jianshu.com/p/493b81544f80)工具。

```python
git clone https://链接
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

git克隆他人项目：您可以点击该用户项目卡片

![image-20221106100158854](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG633.png)

接下来的步骤同上git clone 当前链接到指定路径修改或者直接Fork到你的项目里面。

![image-20221106100817475](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG634.png)

## git模型仓

Git克隆自己的模型：点击个人主页->模型，进入模型界面->文件->点击克隆。

点击模型按钮，进入自己的模型卡片。

![image-20221108142827031](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG635.png)

点击文件可以对模型进行git克隆。

![image-20221108142827031](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG636.png)

点击克隆按钮可以对模型进行git clone的操作。

![image-20221108142827031](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG637.png)

git克隆他人项目：您可以点击该用户模型卡片

![image-20221108142827031](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG638.png)

Git clone链接，其他操作跟项目git操作类似。

![WechatIMG495](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG637.png)

## Git数据集

Git克隆自己的数据集：点击个人主页->数据集，进入数据集界面->文件->点击克隆。

点击数据集按钮，进入自己的数据集卡片。

注：只有个人代码仓可以push，他人代码仓只能克隆

![image-20221108142827031](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG639.png)

点击文件可以对数据集进行git克隆。

注：只有个人代码仓可以push，他人代码仓只能克隆

![image-20221108142827031](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG640.png)

点击克隆按钮可以对数据集进行git clone的操作。

注：只有个人代码仓可以push，他人代码仓只能克隆

![image-20221108142827031](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG641.png)

git克隆他人数据集：您可以点击该用户数据集卡片

注：只有个人代码仓可以push，他人代码仓只能克隆

![image-20221108142827031](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG638.png)

Git clone链接，其余操作与项目git操作类似。

注：只有个人代码仓可以push，他人代码仓只能克隆

![WechatIMG495](https://obs-xihe-beijing4.obs.cn-north-4.myhuaweicloud.com/xihe-img/%E6%96%B0_%E4%B8%8B%E8%BD%BD%E3%80%81%E5%85%8B%E9%9A%86/WechatIMG642.png)



