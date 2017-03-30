import React from 'react'
import { render } from 'react-dom'

import Logo from './components/Logo'
import Excel from './components/Excel'

const App = () => {
  const headers = localStorage.getItem('headers') ? localStorage.getItem('headers') : ['タイトル', '年', '評価', 'コメント']
  const data = localStorage.getItem('data') ? localStorage.getItem('data') : [['テスト', '2015', '3', 'あああ']]

  return (
    <div>
      <h1>
        <Logo /> Whinepadにようこそ！
        <Excel headers={headers} initialData={data} />
      </h1>
    </div>
  )
}

render(
  <App />,
  document.getElementById('app')
)
