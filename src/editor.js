
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
          insertText: 'tan', // 不写的时候不展示。。
          detail: '提示的文字'
        },
        {
          label: 'cos',
          insertText: 'cos',
          detail: '提示的文字'
        },
        {
          label: 'sin',
          insertText: 'sin',
          detail: '提示的文字'
        }
      ], // 储存提示语
      calculateValue: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    // 编辑框的值
    if (this.state.calculateValue !== nextProps.calculateValue) {
      this.setState({
        calculateValue: nextProps.calculateValue
      })
    }
  }

  onBlur = () => {
    const { calculateValue } = this.state
    this.props.value(calculateValue)
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

  click = () => {
    const editor = this.monacoEditorRef.current.editor
    const p = editor.getPosition()
    editor.executeEdits('',
      [
        {
          range: new monaco.Range(p.lineNumber,
            p.column,
            p.lineNumber,
            p.column),
          text: '我是根据光标位置插入的值'
        }
      ]
    )
  }

  render() {
    return (
      <>
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
        <button onClick={this.click}>根据光标插入</button>
      </>
    )
  }
}

export default DEditor
