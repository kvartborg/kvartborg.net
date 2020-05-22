import Layout from 'components/Layout'
import { Link } from 'preact-router'
import './Work.css'



export default () => (
  <Layout title="Work" description="Work experience and projects that i'm currently contributing to or working on">
    <article class='work wrap'>
      <header>
        <h1>Projects 👨‍💻</h1>
        <p>
          I have compiled a list of selected open source projects i have contributed to or are currently working on, most are just experiments.
        </p>
      </header>
      <div class="projects">
        <article>
          <header>
            <h3>vector <a href="https://github.com/kvartborg/vector" rel="vector repository" target="_blank"><i class="fab fa-github" /></a></h3>
            <p>Is an experiment about finding a better way to write vector math in Go, there has to be a more expressive way without it getting to verbose, <Link href="/post/2020/02/02/vector" rel="See post">See post</Link>.</p>
          </header>
        </article>
        <article>
          <header>
            <h3>tag <a href="https://github.com/kvartborg/tag" rel="tag repository" target="_blank"><i class="fab fa-github" /></a></h3>
            <p>The tag package provides a way to parse a <code><a href="https://github.com/golang/go/blob/0377f061687771eddfe8de78d6c40e17d6b21a39/src/reflect/type.go#L1102" rel="StructTag definition" target="_blank">StructTag</a></code> into a map of key value pairs.</p>
          </header>
        </article>
        <article>
          <header>
            <h3>go-nmea <a href="https://github.com/adrianmo/go-nmea" rel="go-nmea repository" target="_blank"><i class="fab fa-github" /></a></h3>
            <p>
              Is a library that parses <code><a href="https://www.tronico.fi/OH6NT/docs/NMEA0183.pdf" rel="NMEA0183 protocol definition" target="_blank">NMEA0183</a></code> sentences, it is written in pure Go, by <a href="https://github.com/adrianmo" rel="adrianmo's github account" target="_blank">@adrianmo</a>.
              I have added support for the <code>RTE</code>, <code>WPL</code> and <code>VHW</code> sentences. <br />
            </p>
          </header>
        </article>
        <article>
          <header>
            <h3>go-dualshock <a href="https://github.com/kvartborg/go-dualshock" rel="go-dualshock repository" target="_blank"><i class="fab fa-github" /></a></h3>
            <p>
              Connect a PS4 DualShock controller with your Go program.
            </p>
          </header>
        </article>
        <article>
          <header>
            <h3>hueify <a href="https://github.com/kvartborg/hueify" rel="hueify repository" target="_blank"><i class="fab fa-github" /></a></h3>
            <p>
              Control your Philips Hue lights from your Mac.
              The application is built with Preact and Electron.
              It can be built for Windows, but i havent tested it.
            </p>
          </header>
        </article>
        <article>
          <header>
            <h3><a href="https://github.com/kvartborg?tab=repositories" rel="quartercastles repositories" target="_blank">See all my repositories</a></h3>
            <p>
            </p>
          </header>
        </article>
      </div>
    </article>




    <article class="work wrap">
      <header>
        <h1>Work Experience 💼</h1>
        <p>
        </p>
      </header>
      <div class="projects">
        <article>
          <header>
            <h3>DanaDynamics</h3>
            <small>July 2018 - Present</small>
            <p>
              At DanaDynamics we are developing autonomous navigation for maritime vessels. My primary focus and role at DanaDynamics is to define the system architecture, planning/delegation of work, development of navigation, simulation and mission control software.
            </p>
          </header>
        </article>
        <article>
          <header>
            <h3>Uptime</h3>
            <small>September 2014 - August 2017</small>
            <p>
              I worked for Uptime as a Software Developer from 2014 - 2017.<br />
              At Uptime i were involved in a lot of different projects through the years.
              This includes webshops, progressive web applications based on React/Preact or Vue.js,
              and embedded development for the Rasperry pi. Here is a list of some of
              the projects i worked on: Bridge Walking Lillebælt, Screenify, EcoGrid, Vision Field Care, UpSub,
              internal Dashboard for monitoring and other internal stuff.
            </p>
          </header>
        </article>
        <article>
          <header>
            <h3>Freelance Web Developer</h3>
            <small>April 2012 - September 2014</small>
            <p>
              I startet my career out as a freelance web developer.
              Didn't really know what i was doing at the time, other
              than i could get cool things to work on the web and earn a
              bit of money beside my studies.
            </p>
          </header>
        </article>
      </div>
    </article>
  </Layout>
)

// <UpSub />
// <EcoGrid />
// <Hueify />
// <Uptime />
