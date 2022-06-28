import sidebar from './sidebar'
import head from './head'
import markdown from './markdown'
const config = {
  base: "/",
  lang:"zh-cn",
  title: 'MindSpore',
  description: 'MindSpore DOCS',
  head,
  markdown,
  themeConfig: {
    sidebar:sidebar.sidebar,
  },
  dest:"./dist"
}

export default config
