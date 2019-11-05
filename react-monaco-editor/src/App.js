/*
 * @Author: your name
 * @Date: 2019-11-04 17:30:45
 * @LastEditTime: 2019-11-05 10:13:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-monaco-demo/src/testEditor/index.js
 */


// dva 不写任何model层 只是展示用
import React from 'react'
// import Loadable from 'react-loadable'
import Editor from './editor'
// import { MyLoadingComponent } from '../utils/utils'

// const Editor = Loadable({
//   loader: () => import('../components/Editor'),
//   loading: MyLoadingComponent
// })

class Calculate extends React.Component {
  constructor() {
    super()
    this.editorRef = React.createRef()
  }

  state = {
    setRuleContent: [], // 规则导入的中文 插入到计算框
    componentContentCn: '', // 计算框的内容
    isEditorErr: false // 控制计算框的报错
  }

  // 将计算框的值传递出去
  getValue = (componentContentCn) => {
    this.setState({
      componentContentCn
    })
    this.props.value(componentContentCn)
  }

  render() {
    return (
      <Editor
        ref={this.editorRef}
        value={this.getValue}
        calculateValue={this.state.componentContentCn}
        setRuleContent={this.state.setRuleContent}
      ></Editor>
    )
  }
}

export default Calculate