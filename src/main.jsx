import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Tailwind CSS를 위한 기본 CSS 임포트
import { BrowserRouter } from 'react-router-dom'; // BrowserRouter 임포트
import { Provider } from 'react-redux'; // Redux Provider 임포트
import { store } from './redux/store'; // Redux 스토어 임포트

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* Redux 스토어를 앱에 제공 */}
      <BrowserRouter> {/* 라우팅 기능을 앱에 제공 */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
