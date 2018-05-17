import Layout from 'components/Layout'
import Document from 'components/Document'
import './Blog.css'

export default ({ year, month, day, post }) => (
  <Layout style={{minHeight: '100vh'}} footer={true}>
    <Document path={`${year}-${month}-${day}-${post}`} />
  </Layout>
)
