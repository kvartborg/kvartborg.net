import Layout from 'components/Layout'
import './About.css'

export default () => (
  <Layout footer={false}>
    <main class='about'>
      <img alt="Profile img" src='https://avatars1.githubusercontent.com/u/6551905?s=460&v=4' />
      <article>
        <header>
          <h1>Hello 👋</h1>
          <p>
            I'm Frederik. I design and develop software,
            currently developing an autonomous vessel at <a href='#'>DanaDynamics</a>.
          </p>
        </header>
        <section class='social'>
          <a href="mailto:hello@kvartborg.net" aria-label="Email"><i class="fas fa-at"></i></a>
          <a href="https://github.com/kvartborg" aria-label="Github" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>
          <a href="https://twitter.com/kvartborg" aria-label="Twitter" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i></a>
          <a href="https://www.linkedin.com/in/kvartborg" aria-label="Linkedin" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i></a>
          <a href="https://instagram.com/frederik.kvartborg" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
        </section>
      </article>
    </main>
  </Layout>
)
