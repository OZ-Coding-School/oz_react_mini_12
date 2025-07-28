// react앱을 브라우저에 렌더링하기위한 핵심 라이브러리 얘네도 다운 밑에 두줄
import React from 'react'
import ReactDOM from 'react-dom/client'
// App컴포넌트를 갖고왔다.
import App from './App.jsx'
// 라이브러리니까 다운받고 써야 함
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './App.css'

// 
ReactDOM.createRoot(document.getElementById('root')).render(
  // 리액트 라우터는 브라우저의 URL 변화를 감지해야 하는데 BrowserRouter이게 그 역할이다.
  // 브라우저 주소창의 변화를 리액트가 읽을 수 있게 도와주는 애
  // Route, Link, Outlet등 react-router-dom기능을 사용할 수 있게 된다.
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
