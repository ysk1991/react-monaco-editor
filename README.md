<!--
 * @Author: your name
 * @Date: 2019-10-14 11:41:57
 * @LastEditTime: 2019-11-05 11:50:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-monaco-demo/react-monaco-editor/README.md
 -->
# 下载项目
>git clone https://github.com/ysk1991/react-monaco-editor.git

# 进入目录
>cd react-monaco-editor

# 安装依赖
>yarn install

# 需要编辑器依赖
>yarn add --dev react-monaco-editor monaco-editor

# 暴露webpack
>yarn ejecrt 

# 修改webpack
>const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
>new MonacoWebpackPlugin(['apex', 'azcli', 'bat', 'clojure', 'coffee', 'cpp', 'csharp', 'csp', 'css', 'dockerfile', 'fsharp', 'go', 'handlebars', 'html', 'ini', 'java', 'javascript', 'json', 'less', 'lua', 'markdown', 'msdax', 'mysql', 'objective', 'perl', 'pgsql', 'php', 'postiats', 'powerquery', 'powershell', 'pug', 'python', 'r', 'razor', 'redis', 'redshift', 'ruby', 'rust', 'sb', 'scheme', 'scss', 'shell', 'solidity', 'sql', 'st', 'swift', 'vb', 'xml', 'yaml'])
