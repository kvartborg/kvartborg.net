import { Component } from 'preact'
import Layout from 'components/Layout'
import './Posts.css'

export default class extends Component {
  state = {
    posts: []
  }

  componentDidMount () {
    this.loadPosts()
  }

  loadPosts = async () => {
    const res = await fetch('/api/docs.json')
    const posts = await res.json()

    this.setState({ posts })
  }

  render (_, { posts }) {
    return (
      <Layout title='Posts' description='Stuff that i have written, the posts purpose is mostly for my self to remember how i did something in the future.'>
        <main class='posts'>
          <article class='wrap'>
            <header>
              <h1>Posts ✍️</h1>
              <p>
                Stuff that i have written, the posts purpose is mostly for my self to remember how i did something in the future.
              </p>
            </header>
          </article>
          <section>
            {posts.map(post => (
              <a href={`/post/${post.url}`} aria-label={post.title}>
                <article style={{ color: post.menuColor, 'background': post.cover }}>
                  <header>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
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
