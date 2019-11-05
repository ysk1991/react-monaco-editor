
import React from 'react'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import MonacoEditor from 'react-monaco-editor'

class DEditor extends React.Component {
  constructor(props) {
    super(props)
    this.monacoEditorRef = React.createRef()
    this.state = {
      setRuleContent: [], // 规则导入的中文 插入到计算框
      tipList: [':', 't', 'c', 's'], // 储存计算框提示语的首字母
      suggestions: [
        {
          label: 'tan',
          insertText: '测试1', // 不写的时候不展示。。
          detail: '提示的文字'
        },
        {
          label: 'cos',
          insertText: '测试22',
          detail: '提示的文字'
        },
        {
          label: 'sin',
          insertText: '测试3',
          detail: '提示的文字'
        }
      ], // 储存提示语
      calculateValue: ''
    }
  }

  componentWillMount() {
    // 拦截判断是否离开当前页面
    window.addEventListener('beforeunload', this.beforeunload)
  }

  componentDidMount() {
    this.setState({
      calculateValue: this.props.calculateValue
    })
  }

  componentWillReceiveProps(nextProps) {
    // nextProps.setRuleContent设置成一个数组 每一次读取数组的最后一个元素 然后在光标的位置插入编辑器
    if (this.state.setRuleContent !== nextProps.setRuleContent) {
      this.setState({
        setRuleContent: nextProps.setRuleContent
      })
      const editor = this.monacoEditorRef.current.editor
      const p = editor.getPosition()
      editor.executeEdits('',
        [
          {
            range: new monaco.Range(p.lineNumber,
              p.column,
              p.lineNumber,
              p.column),
            text: nextProps.setRuleContent[nextProps.setRuleContent.length - 1]
          }
        ]
      )
    }
    // 编辑框的值
    if (this.state.calculateValue !== nextProps.calculateValue) {
      this.setState({
        calculateValue: nextProps.calculateValue
      })
    }
  }

  beforeunload() {
    // 如果是刷新页面 清空sessionStorage
    sessionStorage.removeItem('isLoadDEditor')
  }

  onBlur = () => {
    const { calculateValue } = this.state
    this.props.value(calculateValue)
    if (calculateValue) {
      this.props.isEditorErrFn(false)
    }
  }

  onChangeHandle = (value, e) => {
    this.setState({
      calculateValue: value
    })
  }

  editorDidMountHandle = (editor, monaco) => {
    const { suggestions, tipList } = this.state
    monaco.languages.registerCompletionItemProvider('plaintext', {
      provideCompletionItems() {
        return {
          suggestions: suggestions.map(item => ({ ...item, kind: monaco.languages.CompletionItemKind.Variable }))
        }
      },
      triggerCharacters: tipList
    })
    this.timeouter = setTimeout(() => {
      editor.getAction('editor.action.formatDocument').run()
    }, 300)
  }

  options = {
    selectOnLineNumbers: true,
    renderSideBySide: false
  }

  render() {
    return (
      <div onBlur={this.onBlur}>
        <MonacoEditor
          ref={this.monacoEditorRef}
          width='900'
          height='200'
          language='plaintext'
          theme='vs-dark'
          value={this.state.calculateValue}
          options={this.options}
          onChange={this.onChangeHandle}
          editorDidMount={this.editorDidMountHandle}
        />
      </div>
    )
  }
}

export default DEditor
