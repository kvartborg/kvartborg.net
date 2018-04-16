/* global fetch */
import { Component } from 'preact'
import { route } from 'preact-router'
import Layout from 'components/Layout'
import './Blog.css'

export default class Blog extends Component {
  state = {
    posts: [],
    animate: null
  }

  componentDidMount () {
    this.fetchPosts()
    window.addEventListener("resize", this.initColumn)
  }

  componentWillUnmount () {
    window.removeEventListener("resize", this.initColumn)
  }

  async fetchPosts () {
    const res = await fetch('/blog/posts.json')
    const posts = await res.json()

    this.setState({
      posts: [...posts]
    }, this.initColumn)
  }

  initColumn () {
    if (window.innerWidth < 700) {
      return
    }

    const COL_COUNT = 2
    const col_heights = []
    const container = document.querySelector('.blog')

    for (let i = 0; i <= COL_COUNT; i++) {
      col_heights.push(0)
    }

    for (let i = 0; i < container.children.length; i++) {
      const order = (i + 1) % COL_COUNT || COL_COUNT
      container.children[i].style.order = order
      col_heights[order] += parseFloat(container.children[i].offsetHeight)
    }

    const highest = Math.max.apply(Math, col_heights)
    container.style.height = highest+'px'
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

  renderPost (id, { title, description, cover_text_color, cover_color }) {
    const style = {
      color: cover_text_color,
      background: cover_color
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

    const { title, description, cover_text_color, cover_color, url } = post

    const el = document.getElementById(this.state.animate)
    const viewportOffset = el.getBoundingClientRect()

    const menu = document.querySelector('menu')

    if (menu && cover_text_color) {
      menu.style.color = cover_text_color
    }

    const style = {
      color: cover_text_color,
      background: cover_color,
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
