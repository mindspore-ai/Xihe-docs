import sidebar from './sidebar'
import head from './head'
const config = {
  base: "/",
  lang:"zh-cn",
  title: 'MindSpore',
  description: 'MindSpore DOCS',
  head,
  themeConfig: {
    sidebar:sidebar.sidebar,
  },
  dest:"./dist",
  ignoreDeadLinks: true
}

export default config
