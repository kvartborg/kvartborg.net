import { Component } from 'preact'
import './Menu.css'

export default class Menu extends Component {
  tabs = [
    ['kvartborg', 'fas fa-at', '/', false],
    ['Blog', 'far fa-newspaper', '/blog', true],
    ['Work', 'fas fa-code-branch', '/work', true]
  ]

  render () {
    return (
      <menu>
        <ul>
          {this.tabs.map(tab => this.renderTab(...tab))}
        </ul>
      </menu>
    )
  }

  renderTab (title, icon, url, includes) {
    const active = (url, includes) => {
      if (!includes) {
        return window.location.pathname === url ? 'active' : ''
      }

      return window.location.pathname.includes(url) ? 'active' : ''
    }

    return (
      <li>
        <a class={active(url, includes)} href={url}>
          <i class={icon} />
          <span class='title'>{title}</span>
        </a>
      </li>
    )
  }
}
