import { h, render } from 'preact'
import Routes from './Routes'
import './base.css'

global.h = h

const Main = () => (
  <Routes />
)

render(<Main />, document.getElementById('root'))
