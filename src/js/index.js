import React from 'react'
import { render } from 'react-dom'

import Logo from './components/Logo'

const App = () => {
  return (
    <div>
      <h1>
        <Logo /> Whinepadにようこそ！
      </h1>
    </div>
  )
}

render(
  <App />,
  document.getElementById('app')
)
