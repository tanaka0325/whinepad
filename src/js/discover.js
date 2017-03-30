import React from 'react'
import { render } from 'react-dom'

import Logo from './components/Logo'
import Button from './components/Button'

render(
  <div style={{ padding: '20px' }}>
    <h1>コンポーネント一覧</h1>

    <h2>Logo</h2>
    <div style={{ display: 'inline-block', background: 'purple' }}>
      <Logo />
    </div>

    <h2>Button</h2>
    <div>
      onClickが指定さえれたButton:
      <Button onClick={ () => alert('クリックされました') }>クリック</Button>
    </div>
    <div>
      hrefが指定されたButton:
      <Button href="http://reactjs.com">フォローする</Button>
    </div>
    <div>
      クラス名が指定されたButton:
      <Button className="custom">何もしません</Button>
    </div>

  </div>
  ,
  document.getElementById('app')
)
