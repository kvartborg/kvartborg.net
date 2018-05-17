import { Component } from 'preact'
import Menu from 'components/Menu'
import Footer from 'components/Footer'

export default class Layout extends Component {
  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render ({ children, style, footer = false }) {
    return (
      <div class='wrapper' style={style}>
        <Menu />
        {children}
        {footer && <Footer />}
      </div>
    )
  }
}
