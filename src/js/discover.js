import React from 'react'
import { render } from 'react-dom'

import Logo from './components/Logo'

render(
  <div style={{ padding: '20px' }}>
    <h1>コンポーネント一覧</h1>

    <h2>Logo</h2>
    <div style={{ display: 'inline-block', background: 'purple' }}>
      <Logo />
    </div>

  </div>
  ,
  document.getElementById('app')
)
