import { Router } from 'preact-router'
import AsyncRoute from 'preact-async-route'
import NotFound from 'views/NotFound'

export default () => (
  <Router>
    <AsyncRoute
      path='/'
      getComponent={() => import('views/Profile').then(module => module.default)}
    />
    <AsyncRoute
      path='/blog'
      getComponent={() => import('views/Blog').then(module => module.default)}
    />
    <AsyncRoute
      path='/blog/:year/:month/:day/:post'
      getComponent={() => import('views/Blog/Post').then(module => module.default)}
    />
    <AsyncRoute
      path='/work'
      getComponent={() => import('views/Work').then(module => module.default)}
    />
    <NotFound default path='/not-found' />
  </Router>
)
