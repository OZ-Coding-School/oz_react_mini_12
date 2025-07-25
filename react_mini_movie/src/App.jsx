// 얘내도 react-router-dom이 갖는 기능들 Route:개별 경로를 정의 Routes:여러 경로를 감싸준다.
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from '../components/Layout';
import MovieDetail from '../components/MovieDetail';
import Home from '../pages/Home';

export default function App() {
return (
  <Routes>
    {/* 중첩 라우팅을 위한 부모 Route 즉, 이 라우트에 자식들은 다 Layout을 렌더링한다 */}
    <Route element={<Layout />}>
    {/* 사용자가 브라우저에서 http://localhost:3000/ 같은 루트 주소로 접근 <--(npm run dev)하면
이 경로가 매칭되고, element={<Home />} 이니까 → Home 컴포넌트가 렌더링됨.
중요한 점은 이 컴포넌트는 Layout 안에서 렌더링된다는 것이다 중첩라우팅이기 때문이지!*/}
      <Route path='/' element={<Home />} />
      {/* 쉽게 말해 런 디브해서 http://.../details페이지로 이동하면 element가 렌더링 된다는 것 */}
      <Route path='details' element={<MovieDetail />} />
    </Route>
  </Routes>
  );
}
