import { Component } from 'preact'
import Markdown from 'preact-markdown'
import Layout from 'components/Layout'
import camelcase from 'camelcase'
import renderMathInElement from 'katex/dist/contrib/auto-render.js'
import '@iconfu/svg-inject'
import 'katex/dist/katex.css'
import './Post.css'

export default class extends Component {
  state = {
    article: null
  }

  componentDidMount () {
    this.fetchDocument()
    window.scrollTo(0, 0)
  }

  componentDidUpdate () {
    Prism.highlightAll()

    renderMathInElement(document.body, [
      {left: "$$", right: "$$", display: true},
      {left: "\\(", right: "\\)", display: false},
      {left: "\\[", right: "\\]", display: true}
    ])

    const imgs = document.querySelectorAll("img")

    for (const img of imgs) {
      if (img.src.substr(img.src.length-4) !== ".svg") continue
      SVGInject(img, {makeIdsUnique: false});
    }

    const headings = document.querySelectorAll("h1, h2, h3")

    for (const heading of headings) {
      const id = heading.getAttribute('id')

      if (!id) {
        continue
      }

      heading.classList.remove('linked')
      heading.addEventListener("click", () => (
        window.location.hash = id
      ))
    }

    if (window.location.hash !== "") {
      const el = document.querySelector(window.location.hash)

      if (!el) {
        return
      }

      setTimeout(() => {
        el.classList.add("linked")
        window.scrollTo(0, el.offsetTop-40)
      }, 0)
    }
  }




  async fetchDocument () {
    const [_, __, year, month, day, title] = window.location.pathname.split('/')
    const res = await fetch(`/static/docs/${year}-${month}-${day}-${title}.md`)
    this.parseDoc(await res.text())
  }

  parseDoc (doc) {
    const [_, rawHeader, ...body] = doc.split('---') //eslint-disable-line
    const header = {}

    for (const item of rawHeader.split('\n')) {
      const [key, ...value] = item.split(':')
      header[camelcase(key).trim()] = value.join(':').trim()
    }

    this.setState({
      article: {
        header,
        text: body.join('').trim()
      }
    })
  }

  loading () {
    return (
      <div class='loading'>
        <i class="fas fa-asterisk" />
      </div>
    )
  }

  render (_, { article }) {
    return (
      <Layout
        title={article ? article.header.title : undefined}
        description={article ? article.header.description : undefined}
        menuColor={article && article.header.menuColor}
      >
        <article class='post'>
          {!article && this.loading()}
          {article && article.header.cover && (
            <div class='cover' style={{color: article.header.menuColor, background: article.header.cover}}>
              <header class='wrap'>
                <h1>{article.header.title}</h1>
                <p>{article.header.description}</p>
              </header>
            </div>
          )}
          {article && (
            <div>
              <section class='wrap'>
                <Markdown markupOpts={{'allow-scripts': true}} markdown={article.text || ''} />
              </section>
              <footer class='wrap'>
                <time time={article.header.created}>Published: {article.header.created}</time>
              </footer>
            </div>
          )}
        </article>
      </Layout>
    )
  }
}
