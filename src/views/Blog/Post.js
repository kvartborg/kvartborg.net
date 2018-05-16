import Layout from 'components/Layout'
import Document from 'components/Document'
import './Blog.css'

export default ({ post }) => (
  <Layout>
    <Document path={post} />
  </Layout>
)
