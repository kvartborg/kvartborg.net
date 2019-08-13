import { Router } from 'preact-router'
import AsyncRoute from 'preact-async-route'
import NotFound from 'views/NotFound'

export default () => (
  <Router>
    <AsyncRoute
      path='/'
      getComponent={() => import('views/About').then(module => module.default)}
    />
    <AsyncRoute
      path='/articles'
      getComponent={() => import('views/Articles').then(module => module.default)}
    />
    <AsyncRoute
      path='/article/:year/:month/:day/:title'
      getComponent={() => import('views/Article').then(module => module.default)}
    />
    <AsyncRoute
      path='/work'
      getComponent={() => import('views/Work').then(module => module.default)}
    />
    <NotFound default path='/not-found' />
  </Router>
)
