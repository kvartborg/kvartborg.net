import { Router } from 'preact-router'
import AsyncRoute from 'preact-async-route'

export default () => (
  <Router>
    <AsyncRoute
      path='/blog'
      getComponent={() => import('views/Blog').then(module => module.default)}
    />
    <AsyncRoute
      path='/projects'
      getComponent={() => import('views/Projects').then(module => module.default)}
    />
  </Router>
)
