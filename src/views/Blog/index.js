/* global fetch */
import { Component } from 'preact'
import { route } from 'preact-router'
import Layout from 'components/Layout'
import './Blog.css'

export default class Blog extends Component {
  state = {
    posts: JSON.parse(localStorage.getItem('posts')) || [],
    animate: null
  }

  componentDidMount () {
    this.fetchPosts()
  }

  async fetchPosts () {
    const res = await fetch('/blog/posts.json')
    const posts = await res.json()
    localStorage.setItem('posts', JSON.stringify(posts))

    this.setState({
      posts: [...posts]
    }, this.initColumn)
  }

  animate = id => {
    this.setState({ animate: id })
  }

  render () {
    const { posts, animate } = this.state

    return (
      <Layout>
        <section class='blog-heading'>
          <h1>Posts</h1>
        </section>
        <section class='blog-section'>
          <div class={'blog ' + (animate !== null ? 'animate' : '')}>
            {posts.map((post, id) => this.renderPost(id, post))}
            {this.state.animate !== null && this.renderAnimationPost()}
          </div>
        </section>
      </Layout>
    )
  }

  renderPost (id, { title, description, coverTextColor, coverColor }) {
    const style = {
      color: coverTextColor,
      background: coverColor
    }

    const classes = ['post'].join(' ')

    return (
      <div id={id} key={id} class={classes} onClick={() => this.animate(id)}>
        <header style={style}>
          <section>
            <div>
              <h1>{title}</h1>
              <h2 class='subject'>{description}</h2>
            </div>
          </section>
        </header>
      </div>
    )
  }

  renderAnimationPost () {
    const post = this.state.posts.find(
      (_, index) => index === this.state.animate
    )

    const { title, description, coverTextColor, coverColor, url } = post

    const el = document.getElementById(this.state.animate)
    const viewportOffset = el.getBoundingClientRect()

    const menu = document.querySelector('menu')

    if (menu && coverTextColor) {
      menu.style.color = coverTextColor
    }

    const style = {
      color: coverTextColor,
      background: coverColor
    }

    const initStyle = {
      width: el.offsetWidth,
      height: el.offsetHeight,
      transform: `translate(${viewportOffset.left}px, ${viewportOffset.top}px)`
    }

    window.__postHeader = post

    return (
      <div class='post animate' style={initStyle} onAnimationEnd={() => route('/blog/' + url, false)}>
        <header style={style}>
          <section>
            <h1>{title}</h1>
            <h2 class='subject'>{description}</h2>
          </section>
        </header>
      </div>
    )
  }
}
