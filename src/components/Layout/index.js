import { Component } from 'preact'
import Menu from 'components/Menu'
import Footer from 'components/Footer'
import './Layout.css'

export default class Layout extends Component {
  componentDidMount () {
    this.setMetaInfo(this.props)
    Prism.highlightAll()
  }

  componentWillReceiveProps (nextProps) {
    this.setMetaInfo(nextProps)
  }

  setMetaInfo (props) {
    document.title = props.title || 'Frederik Kvartborg'
    document.head.querySelector('meta[name=description]').setAttribute('content', props.description || "Hi I'm Frederik. I design and develop software, currently developing an autonomous vessel at DanaDynamics.")
  }

  render ({ children, menuColor, footer = true }) {
    return (
      <div class='layout'>
        <Menu color={menuColor || ''} />
        <div class='view'>{children}</div>
        {footer && <Footer />}
      </div>
    )
  }
}
