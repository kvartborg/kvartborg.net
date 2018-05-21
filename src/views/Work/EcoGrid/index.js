import './EcoGrid.css'
import preview from './video-preview.png'

const Logo = () => (
  <svg class='logo' viewBox='0 0 180.42 85.02'>
    <defs>
      <style>{'.a{fill:#da4626;}'}</style>
    </defs>
    <path class='a' d='M114.88,85V77.43h65.54V28.1h-40v9.37H114.88V7.59H77.42V0h-40V7.66H0v40H37.46V77.43H74.91V85h40ZM143,30.6h35V74.93H143V30.6ZM114.88,40h25.58v35H114.88V40ZM37.46,45.12H2.5v-35h35v35Zm40-35h35v35H77.42v-35Zm0,37.47h34.95v35h-35v-35ZM40,2.5h35v35H40V2.5Zm0,72.43V47.62h0V40H74.91v35H40Z' />
    <polygon class='a' points='26.32 33.32 17.4 33.32 17.4 28.82 24.9 28.82 24.9 24.79 17.4 24.79 17.4 20.39 26.32 20.39 26.32 16.32 12.77 16.32 12.77 37.38 26.32 37.38 26.32 33.32' />
    <path class='a' d='M56.9,30.28c4.42,0,7.71-2,9.37-5.08l-3.86-1.79a5.79,5.79,0,0,1-5.49,3,5.67,5.67,0,0,1-4.36-1.79A6.53,6.53,0,0,1,50.88,20a6.53,6.53,0,0,1,1.69-4.67,5.76,5.76,0,0,1,4.36-1.76,5.88,5.88,0,0,1,5.49,3l3.86-1.79c-1.66-3.1-5-5-9.37-5A10,10,0,0,0,46.49,20,10,10,0,0,0,56.9,30.28Z' />
    <path class='a' d='M94.89,16.71a11,11,0,0,0-8,3.08,10.41,10.41,0,0,0-3.11,7.77,10.49,10.49,0,0,0,3.11,7.8,12.08,12.08,0,0,0,16.1,0,10.59,10.59,0,0,0,3.08-7.8,10.59,10.59,0,0,0-3.08-7.8A11.11,11.11,0,0,0,94.89,16.71Zm4.7,15.77a6.79,6.79,0,0,1-9.39,0,6.66,6.66,0,0,1-1.82-4.93,6.77,6.77,0,0,1,1.82-4.93,6.88,6.88,0,0,1,9.39,0,6.77,6.77,0,0,1,1.82,4.93A6.66,6.66,0,0,1,99.59,32.49Z' />
    <path class='a' d='M58.15,60.67H63a5.78,5.78,0,0,1-5.62,3.57,6,6,0,0,1-4.6-1.88A7,7,0,0,1,51,57.43a6.89,6.89,0,0,1,1.79-4.93,6.08,6.08,0,0,1,4.6-1.85,6.2,6.2,0,0,1,5.79,3.14l4.07-1.88c-1.75-3.27-5.22-5.32-9.89-5.32a10.52,10.52,0,0,0-11,10.85,10.53,10.53,0,0,0,11,10.88,10.79,10.79,0,0,0,8.13-3.11c2-2.05,3-4.93,3-8.6H58.15v4.07Z' />
    <path class='a' d='M102.66,61c0-4.22-2.86-7.14-7.86-7.14H87.52V75.48h4.76V68.1H94.8l6,7.38h5.82l-7-8.57A6.62,6.62,0,0,0,102.66,61Zm-7.59,3H92.28V58h2.79A3,3,0,0,1,95.07,63.91Z' />
    <rect class='a' x='125.35' y='47.03' width='4.63' height='21.06' />
    <path class='a' d='M166,65.18a10.06,10.06,0,0,0,3.07-7.64,10,10,0,0,0-3.07-7.6A11.19,11.19,0,0,0,157.91,47h-6V68.09h6A11.19,11.19,0,0,0,166,65.18ZM156.52,51.1h1.39c3.93,0,6.51,2.38,6.51,6.45S161.78,64,157.91,64h-1.39V51.1Z' />
  </svg>
)

export default () => (
  <div class='ecogrid'>
    <section>
      <Logo />
      <div class='content'>
        <div class='preview'>
          <img src={preview} />
          <a href='https://player.vimeo.com/video/219810706' target='_blank' rel='noopener noreferrer'><button><i class='fas fa-play' /></button></a>
        </div>
        <div>
          <h1>EcoGrid 2.0</h1>
          <h2 class='subject'>
            One of the projects i was tasked with at Uptime was EcoGrid 2.0.
            My team's primary task was to define the architecture of an interopability
            layer between the system and the aggregators equipment.
            After this process we developed a progressive web application for the
            households, to monitor and control their temperature flexibility.
          </h2>
        </div>
          {/* <a href='http://ecogrid.dk' target='_blank'>Read More</a> */}
      </div>
      {/* <iframe src="https://player.vimeo.com/video/219810706" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> */}
    </section>
  </div>
)
