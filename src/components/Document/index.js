/* global fetch */
import { Component } from 'preact'
import Markdown from 'components/Markdown'
import './Document.css'

export default class Document extends Component {
  headerColor = null
  state = {
    header: {},
    text: ''
  }

  componentDidMount () {
    this.fetchDocument()
  }

  componentWillReceiveProps (nextProps) {
    this.props = nextProps
    this.fetchDocument()
  }

  async fetchDocument () {
    this.setState({ header: {}, text: '' })
    const res = await fetch(`/static/docs/${this.props.path.toLowerCase()}.md`)
    const doc = await res.text()
    this.parseDoc(doc)
  }

  parseDoc (doc) {
    const [_, rawHeader, ...body] = doc.split('---')
    const header = {}

    for (const item of rawHeader.split('\n')) {
      const [key, ...value] = item.split(':')
      header[key.trim()] = value.join(':').trim()
    }

    this.setState({
      header,
      text: body.join('').trim()
    })
  }

  render ({ path }, { header, text }) {
    return (
      <div class={`document ${text === '' ? 'loading' : ''}`}>
        {this.renderHeader(window.__postHeader || header)}
        {this.renderContent(text)}
      </div>
    )
  }

  renderHeader ({ title, description, cover_color, cover_text_color }) {
    const style = {
      background: cover_color,
      color: cover_text_color
    }

    if (!title) {
      return null
    }

    const menu = document.querySelector('menu')

    if (menu) {
      menu.style.color = cover_text_color
    }

    return (
      <div>
        <header style={style}>
          <section>
            <h1>{title}</h1>
            <h2 class='subject'>{description}</h2>
          </section>
        </header>
      </div>
    )
  }

  renderContent (text) {
    if (text === '') {
      return <div class='loading'><i class='fas fa-circle-notch fa-spin' /></div>
    }

    return (
      <section class='text'>
        <Markdown text={text} />
      </section>
    )
  }
}
