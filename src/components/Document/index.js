/* global fetch */
import { Component } from 'preact'
import Markdown from 'components/Markdown'
import './Document.css'

export default class Document extends Component {
  state = {
    text: ''
  }

  componentDidMount () {
    this.fetchDocument()
  }

  componentWillReceiveProps (nextProps) {
    this.props = nextProps
    this.fetchDocument()
  }

  fetchDocument () {
    this.setState({ text: '' })
    fetch(`/static/blog/${this.props.path.toLowerCase()}.md`)
      .then(res => res.text())
      .then(text => this.setState({ text }))
  }

  render ({ path }, { text }) {
    return (
      <div class={`document ${text === '' ? 'loading' : ''}`}>
        {this.renderContent(text)}
      </div>
    )
  }

  renderContent (text) {
    if (text === '') {
      return <i class='fas fa-circle-notch fa-spin' />
    }

    return <Markdown text={text} />
  }
}
