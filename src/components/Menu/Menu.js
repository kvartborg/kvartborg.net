import { Component } from 'preact'
import './Menu.css'

const isActive = path => {
  return window.location.pathname === path ? 'active' : undefined
}

export default class extends Component {
  render ({ color }) {
    if (window.innerWidth < 1080) {
      color = {}
    }

    return (
      <menu>
        <ul>
          <li class={isActive('/')}>
            <a href='/' style={{color}} aria-label='kvartborg' alt='quartercastle' tabindex="1">
              <i class="fas fa-at" /> <span>quartercastle</span>
            </a>
          </li>
          <li class={isActive('/posts') || window.location.pathname.includes('post/') ? 'active' : ''}>
            <a href='/posts' aria-label='posts' alt='posts' style={{color}} tabindex="2">
              <i class="far fa-newspaper" /> <span>posts</span>
            </a>
          </li>
          <li class={isActive('/work')}>
            <a href='/work' style={{color}} tabindex="3">
              <i class="fas fa-code-branch" aria-label='work' alt='work' /> <span>work</span>
            </a>
          </li>
        </ul>
      </menu>
    )
  }
}
