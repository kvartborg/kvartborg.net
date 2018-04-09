import { Component } from 'preact'
import Markdown from 'preact-markdown'
import hljs from 'highlight.js'
import 'components/Code/Code.css'

export default class extends Component {
  componentDidMount () {
    this.initCodeBlocks()
  }

  componentDidUpdate () {
    this.initCodeBlocks()
  }

  initCodeBlocks () {
    const blocks = document.querySelectorAll('pre code')

    for (const block of blocks) {
      hljs.highlightBlock(block)
    }
  }

  shouldComponentUpdate (nextProps) {
    if (nextProps.text === this.props.text) {
      return false
    }
  }

  render ({ text }) {
    return <Markdown markdown={text} />
  }
}
