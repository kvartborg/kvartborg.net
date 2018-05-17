import Layout from 'components/Layout'
import './Profile.css'

export default () => (
  <Layout>
    <section class='profile'>
      <center>
        <img src='https://avatars1.githubusercontent.com/u/6551905?s=460&v=4' />
      </center>
      <div>
        <h1>Hello!</h1>
        <h2 class='subject'>
          I'm Frederik. I design and develop software, primarily within the context of the web.<br />
        </h2>
        <div class='social'>
          <a href='mailto:hello@kvartborg.net'><i class='fas fa-at' /></a>
          <a href='https://github.com/kvartborg' target='_blank' rel='noopener noreferrer'><i class='fab fa-github' /></a>
          <a href='https://twitter.com/kvartborg' target='_blank' rel='noopener noreferrer'><i class='fab fa-twitter' /></a>
          <a href='https://www.linkedin.com/in/kvartborg' target='_blank' rel='noopener noreferrer'><i class='fab fa-linkedin' /></a>
          <a href='https://instagram.com/frederik.kvartborg' target='_blank' rel='noopener noreferrer'><i class='fab fa-instagram' /></a>
        </div>
      </div>
    </section>
  </Layout>
)
