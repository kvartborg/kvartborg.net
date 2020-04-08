import { Component } from 'preact'
import Markdown from 'preact-markdown'
import Layout from 'components/Layout'
import NotFound from 'views/NotFound'
import camelcase from 'camelcase'
import '@iconfu/svg-inject'
import './Post.css'

export default class extends Component {
  state = {
    notFound: false,
    article: null
  }

  componentDidMount () {
    this.fetchDocument()
    window.scrollTo(0, 0)
  }

  componentDidUpdate () {
    Prism.highlightAll()

    this.renderMath()

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

      el.classList.add("linked")
      window.scrollTo(0, el.offsetTop-40)
    }
  }

  renderMath() {
    let mathRenderInterval = null
    mathRenderInterval = setInterval(() => {
      if (!window.renderMathInElement) {
        return
      }

      try {
        window.renderMathInElement(document.querySelector("article.post"))
      } catch(err) {
        console.error(err)
      }
      mathRenderInterval = clearInterval(mathRenderInterval)

      const eqs = document.querySelectorAll('.katex-display')

      for (const eq of eqs) {
        const children = eq.parentNode.parentNode.childNodes

        let noText = true

        for (const child of children) {
          if (child.nodeType !== Node.TEXT_NODE) {
            continue
          }

          if (child.length > 0) noText = false
        }

        if (noText) {
          eq.style.display = 'block'
        }
      }
    }, 1)
  }

  async fetchDocument () {
    const [_, __, year, month, day, title] = window.location.pathname.split('/')
    const res = await fetch(`/static/docs/${year}-${month}-${day}-${title}.md`)

    if (res.headers.get("Content-Type").includes("text/html")) {
      this.setState({ notFound: true })
      return
    }

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

  render (_, { article, notFound }) {
    if (notFound) {
      return <NotFound />
    }

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
