import { Component } from 'preact'
import './Hueify.css'

export default class Hueify extends Component {
  video = null

  componentDidMount () {
    this.video.play()
  }

  render () {
    return (
      <div class='hueify'>
        <section>
          <img src={require('./icon.png')} />
          <div class='content'>
            <video
              ref={el => (this.video = el)}
              src={require('./hueify.mp4')}
              loop
              muted
              playsinline
              autoPlay
            />
            <div>
              <h1>Hueify</h1>
              <h2 class='subject'>
                Take control of your Philips Hue lights from your Mac.
                The application is build with Preact and Electron and therefore easily
                hackable. Can be build for Windows as well, just havent had the time.
                Would love a PR if somebody wants to port it.
              </h2>
              <ul class='links'>
                <li>
                  <a href='https://github.com/kvartborg/hueify' target='_blank' rel='noopener noreferrer'>
                    <i class='fab fa-github' /> Source code
                  </a>
                </li>
                <li>
                  <a href='https://github.com/kvartborg/hueify/releases/download/v0.1.1/Hueify.dmg'>
                    <i class='fas fa-download' /> Download
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
