import React from 'react';
import './App.css';

import { Route, Routes, useLocation } from 'react-router-dom';

//
import Header from './components/Header';
import Footer from './components/Footer';

// 홈 화면
import Home from './pages/home';

// 회원가입 화면
import Register from './pages/register';
import AdminRegister from './pages/register/admin_register';

// 로그인 화면
import Login from './pages/login';

// # Router 설계`
// 1. 'main' path 작성 : '/'
// 2. 'login' path 작성 : '/login' (로그인)
// 3. 'register' path 작성 : '/register' (회원가입)
// >> 중복 라우터 'admin' 회원가입
// >> 중복 라우터 'user' 회원가입
// 4. 'myPage' path 작성 : 'myPage' (마이페이지)
// >> 중복 라우터 (회원 정보 수정)
// 5. 'post' path 작성 : 'post' (게시판)
// >> 중복 라우터 (게시판 작성)
// >> 중복 라우터 (게시판 수정)

function App() {
  const path = useLocation();

  return (
    <>
      <Header />
      <Routes>
        {/* Home 홈화면 */}
        <Route path='/' element={<Home />} />

        {/* Register 회원가입 */}
        <Route  path='/register' element={<Register />} />
        <Route  path='/register/admin' element={<AdminRegister />} />

        {/* Login 로그인 */}
        <Route path='login' element={<Login />} />
      </Routes>
      {
        !path.pathname.startsWith('/register') &&
        !path.pathname.startsWith('/login') && <Footer />
      }
    </>
  );
}

export default App;
