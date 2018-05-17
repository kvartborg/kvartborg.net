import Layout from 'components/Layout'
import EcoGrid from './EcoGrid'
import UpSub from './UpSub'
import Hueify from './Hueify'
import Uptime from './Uptime'
import './Work.css'

export default () => (
  <Layout>
    {/* <header class='work'>
      <h1>🚀 Work</h1>
    </header> */}
    <UpSub />
    <EcoGrid />
    <Hueify />
    <Uptime />
  </Layout>
)
