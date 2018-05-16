import Layout from 'components/Layout'
import Document from 'components/Document'
import './Blog.css'

export default ({ year, month, day, post }) => (
  <Layout>
    <Document path={`${year}-${month}-${day}-${post}`} />
  </Layout>
)
