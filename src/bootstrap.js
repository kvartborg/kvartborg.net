import regeneratorRuntime from "regenerator-runtime"
import { h, render } from 'preact'
import Routes from './Routes'
import '@quartercastle/style'
import './base.css'
import './svg.css'


(function setupDarkMode() {
  const theme = localStorage.getItem('theme')

  if (theme) {
    return document.body.classList.add(theme)
  }

  const mql = window.matchMedia('(prefers-color-scheme: dark)')

  if (mql.addEventListener) {
    mql.addEventListener("change", (e) => {
      if (e.matches) {
        document.body.classList.add('dark')
      } else {
        document.body.classList.remove('dark')
      }
    })
  }

  if (mql.matches) {
    document.body.classList.add('dark')
  }
}())

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .catch(() => {})
  })
}


global.regeneratorRuntime = regeneratorRuntime
global.h = h

const Main = () => (
  <Routes />
)

render(<Main />, document.getElementById('root'), document.getElementById('root').lastChild)
