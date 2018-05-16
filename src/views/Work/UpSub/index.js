import { Component } from 'preact'
import './UpSub.css'

const random = (min, max) => Math.floor(Math.random() * max) + min

const Logo = ({ width, height, color = 'primary' }) => (
  <div class='logo'>
    <svg width={width} height={height} viewBox='0 0 200 275'>
      <path class={color} d='M99.8580876,224.056024 L0,274.528973 L99.8580876,0 L199.716175,274.528973 L99.8580876,224.056024 Z' />
      <polygon id='Rectangle-4-Copy' fill-opacity='0.1' fill='#000000' transform='translate(49.929044, 137.264487) scale(-1, 1) translate(-49.929044, -137.264487) ' points='0 0 99.8580876 274.528973 0 224.056024' />
    </svg>
  </div>
)

export default class UpSub extends Component {
  planes = 20
  colors = ['primary', 'primary-light', 'info', 'info-light', 'danger', 'danger-light', 'dark-light', 'grey', 'grey-light']

  render ({ children }) {
    return (
      <div class='upsub'>
        <div class='intro'>
          <div class='planes'>
            {this.renderPlanes(1)}
            {this.renderPlanes(2)}
            {this.renderPlanes(3)}
            {this.renderPlanes(4)}
          </div>
          <div class='content'>
            <section>
              <img src={require('./upsub.png')} />
              <h1>UpSub</h1>
              <h2 class='subject'>
                UpSub is an open source bidirectional communication platform for
                the web, its based on the WebSocket protocol and are utilizing the
                publish/subscribe pattern for sending and receiving messages. <br />
                The goal is to make real-time communication easy to implement, maintain
                and scale with as little overhead as possible.
              </h2>
              <ul class='links'>
                <li>
                  <a href='https://github.com/upsub' target='_blank' rel='noopener noreferrer'>
                    <i class='fab fa-github' /> Source code
                  </a>
                </li>
                <li>
                  <a href='https://upsub.kvartborg.net'  target='_blank' rel='noopener noreferrer'>
                    <i class='fas fa-book' /> Documentation
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    )
  }

  renderPlane (color, x, y, heading, animation) {
    const style = {
      transform: `translate(${x}px, ${y}px) rotate(${heading}deg)`
    }

    animation = `trail animation-${animation}`

    return (
      <div class={animation} style={style}>
        <Logo color={color} />
      </div>
    )
  }

  renderPlanes (animation) {
    const planes = []

    for (let i = 0; i < (this.planes / 4) + 1; i++) {
      planes.push(this.renderPlane(
        this.colors[random(0, this.colors.length - 1)],
        random(0, window.innerWidth),
        random(-window.innerHeight * 1.5, window.innerHeight * 1.5),
        random(0, 359),
        animation
      ))
    }

    return planes
  }
}
