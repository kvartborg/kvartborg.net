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
            <a href='/' style={{color}} aria-label='kvartborg' alt='quartercastle'>
              <i class="fas fa-at" /> <span>quartercastle</span>
            </a>
          </li>
          <li class={isActive('/articles') || window.location.pathname.includes('/article/') ? 'active' : ''}>
            <a href='/articles' aria-label='article' alt='article' style={{color}}>
              <i class="far fa-newspaper" /> <span>articles</span>
            </a>
          </li>
          <li class={isActive('/work')}>
            <a href='/work' style={{color}}>
              <i class="fas fa-code-branch" aria-label='work' alt='work' /> <span>work</span>
            </a>
          </li>
        </ul>
      </menu>
    )
  }
}
