import 'babel-polyfill'
import { h, render } from 'preact'
import Routes from './Routes'
import './base.css'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .catch(() => {})
  })
}

global.h = h

const Main = () => (
  <Routes />
)

render(<Main />, document.getElementById('root'))
