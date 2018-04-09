import { Component } from 'preact'
import hljs from 'highlight.js'
import './Code.css'

export default class Code extends Component {
  element = null

  componentDidMount () {
    hljs.highlightBlock(this.element)
  }

  shouldComponentUpdate () {
    return false
  }

  render ({ children, lang }) {
    return (
      <pre>
        <code ref={el => (this.element = el)} class={lang}>{children}</code>
      </pre>
    )
  }
}
