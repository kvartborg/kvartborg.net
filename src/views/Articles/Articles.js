import { Component } from 'preact'
import Layout from 'components/Layout'
import './Articles.css'

export default class extends Component {
  state = {
    articles: []
  }

  componentDidMount () {
    this.loadArticles()
  }

  loadArticles = async () => {
    const res = await fetch('/api/docs.json')
    const articles = await res.json()

    this.setState({ articles })
  }

  render (_, { articles }) {
    return (
      <Layout title='Articles' description='Stuff that i have written, the articles purpose is mostly for my self to remember how i did something in the future.'>
        <main class='articles'>
          <article class='wrap'>
            <header>
              <h1>Articles ✍️</h1>
              <p>
                Stuff that i have written, the articles purpose is mostly for my self to remember how i did something in the future.
              </p>
            </header>
          </article>
          <section>
            {articles.map(article => (
              <a href={`/article/${article.url}`} aria-label={article.title}>
                <article style={{ color: article.menuColor, 'background': article.cover }}>
                  <header>
                    <h2>{article.title}</h2>
                    <p>{article.description}</p>
                  </header>
                </article>
              </a>
            ))}
          </section>
        </main>
      </Layout>
    )
  }
}
