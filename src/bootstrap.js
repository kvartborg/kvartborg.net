import { h, render } from 'preact'
import Routes from './Routes'
import './base.css'

global.h = h

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}

const Main = () => (
  <Routes />
)

render(<Main />, document.getElementById('root'))
