[[toc]]
## &#x1F449;5分钟快速体验AI全流程开发

在此教程中，我们将通过fork样例仓 <a href ="https://xihe.test.osinfra.cn/projects/wesley/lenet5_demo">wesley/lenet5_demo</a>，快速体验在羲和平台实现AI全流程开发——训练、推理和评估。



### 样例仓介绍

**简单介绍**

基于公开的模型仓库 <a href ="https://xihe.test.osinfra.cn/models/wesley/lenet_mnist">wesley/lenet_mnist</a> 下的MindSpore预训练文件`lenet-1_1875.ckpt`实现迁移学习，使用的的网络是Lenet5，使用的数据集是MNIST。

**相关仓库**

- 模型仓库：<a href ="https://xihe.test.osinfra.cn/models/wesley/lenet_mnist">wesley/lenet_mnist</a> 
- 数据集仓库：<a href="https://xihe.test.osinfra.cn/datasets/wesley/mnist">wesley/mnist</a>

**目录结构**

```shell
.
├── inference                        # 推理可视化相关代码
│   ├── app.py						 # 推理核心启动文件
│   └── pip-requirements.txt		 # 推理可视化相关依赖文件
└── train							 # 训练可视化相关代码
    ├── config.json					 # 训练配置模板
    └── trainDir					 # 训练代码
        ├── pip-requirements.txt	 # 训练相关依赖文件
        ├── train_customize_aim.py	 # 自定义Aim训练代码 
        ├── train_gridsearch.py	     # grid search + LossMonitor 训练代码
        └── train.py				 # LossMonitor训练代码
       
```

> 注：推理可视化相关的代码放在了`inference`文件夹下，训练相关的代码放在了`train`文件夹下。



### 效果展示

**训练**

**评估**

**推理**



### 快速开始

#### Fork 样例仓

1. 在项目搜索页中，搜索样例仓 <a href ="https://xihe.test.osinfra.cn/projects/wesley/lenet5_demo">wesley/lenet5_demo</a>

2. 点击Fork

#### 训练与评估

1. 选择`训练`页签，点击`创建训练实例`按钮

2. 选择`选择配置文件`页签，在输入框输入训练配置模板的路径 `train/config.json`，点击`确认`按钮，将会读取下面的一个json，各个字段的意思如注释所见，更多的详细介绍参考 <a href="">创建训练实例</a>

   ```json
   {	
       "SDK": "ModelArts",               	//训练平台
       "code_dir": "train/trainDir/",	  	//代码目录	
       "boot_file": "train.py",			//启动文件
       "outputs": [{						//输出
           "output_dir": "train/output/",	
           "name": "output_url"
       }
       ]
       ,
       "hypeparameters": {					//超参
       },
       "frameworks": {						//框架
           "framework_type": "MPI",
           "framework_version": "mindspore_1.3.0-cuda_10.1-py_3.7-ubuntu_1804-x86_64",
       },
       "train_instance_type": "modelarts.p3.large.public",	//计算资源
       "log_url": "train/log/",			//日志路径
       "env_variables": {					//环境变量
       },
       "job_description": "测试train.py",  //描述
       "inputs": [{						//输入
           "input_url": "models/wesley/lenet_mnist/lenet-1_1875.ckpt",
           "name": "pretrain_url"
       }, {
           "input_url": "datasets/wesley/mnist/",
           "name": "data_url"
       }],
       "job_name": "ceshi1"               //训练名称
   }
   ```

3. 选择不同的启动文件，你将体验不同评估功能，同时你需要适配的更改上面的配置文件，请选择一种评估方式体验

   - 评估方式1——训练日志可视化

     ```json
     {	
         ...	
         "boot_file": "train_gridsearch.py",			//启动文件
         "outputs": [{						//输出
             "output_dir": "train/output/",	
             "name": "output_url"
         }
         ]
         ...
         "env_variables": {					//环境变量
         },
         "job_description": "测试train_gridsearch.py",  //描述
         "job_name": "ceshi1"               //训练名称
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

4. 点击`创建`，**注意一个仓库同时只能有一个运行中的训练实例，且训练实例最多只能5个**

5. 查看训练列表

6. 查看训练日志

7. 自动评估，**注意只有训练完成之后，评估功能才可用**

   - 评估方式1——训练日志可视化

     根据代码顺序输入Grid Search的超参数范围，注意为浮点数列表，为空时输入`[]`

     ```python
     batch_size: [32, 64, 128]
     learning_rate: [0.01, 0.001, 0.0001]
     momentum: [0.9, 0.99]
     ```

   - 评估方式2——自定义评估

     若此训练实例满足Aim的必要条件，则选择`自定义评估页签`，是可用的

8. 点击`开始评估`按钮
9. 评估中，按钮不可用，评估方式2等待时间会较长，请耐心等待
10. 查看报告
    - 评估方式1——训练日志可视化
    - 评估方式2——自定义评估

#### 推理可视化

1. 选择`推理`页签，点击`启动`按钮
2. 等待2分钟左右，即可体验推理可视化效果
3. MNIST画板效果展示



### 进阶操作

若你想在羲和平台中从0到1创建自己的训练实例、评估和推理可视化，可以参考 <a href="">手把手教你实现AI全流程教程</a>



### 问题反馈

若你按照文档操作出现问题或者有什么疑问，我们欢迎你在我们的[官网仓]()提出你的`ISSUE`，我们会及时回复你。



### FAQs

待补充...



