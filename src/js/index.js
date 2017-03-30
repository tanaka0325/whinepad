import React from 'react'
import { render } from 'react-dom'

import Logo from './components/Logo'
import Whinepad from './components/Whinepad'
import schema from './schema'

let data = JSON.parse(localStorage.getItem('data'))

if (!data) {
  data = {}
  schema.forEach(item => data[item.id] = item.sample)
  data = [data]
}

const App = () => {
  return (
    <div>
      <div className="app-header">
        <Logo /> Whinepadにようこそ！
      </div>
      <Whinepad schema={schema} initialData={data} />
    </div>
  )
}

render(
  <App />,
  document.getElementById('app')
)
