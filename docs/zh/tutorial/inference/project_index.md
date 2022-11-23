更加详细的文档参考[昇思大模型平台项目操作](https://xihe-docs.mindspore.cn/zh/tutorial/inference/)



### 快速上手

```shell
|─inference
	├─app.py            # 核心启动文件
	├─config.json       # 配置文件
	...
	└─requirments.txt	# 依赖文件
```

注：你需要将gradio相关的代码放在`inference`文件夹下面，后台会将`inference`下面的文件拉取到服务器中，注意需将引用的权重文件放在`config.json`中，且项目仓库不能上传lfs文件。

- `app.py`（必须）

  gradio启动文件，相关文档参考[Gradio](https://www.gradio.app/docs/)

- `config.json`（必须）

  输入配置文件，若你要使用平台的模型，格式样例为

  ```json
  {
  	"model_path":["<user>/<repo_name>/<...>/xxx.ckpt"]
  }
  ```

  配置文件的`key`必须为`model_path`。`value`值是一个数组或列表，表示需要加载的模型下公开的权重文件，具体到仓库的文件路径。

  配置此参数，启动的时候会将文件下载到同级，且名字就为`xxx.ckpt`，所以引用文件的时候直接本地路径引用就行。

- ...（可选）

  你也可以将`app.py`依赖的文件放在同级，就和python的模块一样

- `requirments.txt`（必须）

  环境依赖列表



### Gradio Demo

```python
import gradio as gr

def greet(name):
    return "Hello " + name + "!!"

iface = gr.Interface(fn=greet, inputs="text", outputs="text")
iface.launch()
```