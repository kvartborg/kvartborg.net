import { Router } from 'preact-router'
import AsyncRoute from 'preact-async-route'
import Profile from 'views/Profile'
import NotFound from 'views/NotFound'

export default () => (
  <Router>
    <Profile path='/' />
    <AsyncRoute
      path='/blog'
      getComponent={() => import('views/Blog').then(module => module.default)}
    />
    <AsyncRoute
      path='/work'
      getComponent={() => import('views/Work').then(module => module.default)}
    />
    <NotFound default path='/not-found' />
  </Router>
)
