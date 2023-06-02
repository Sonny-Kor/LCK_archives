import React, {useEffect, useState } from 'react';

import './LoginPage.scss';

import { requestLogin } from '../../services/api_auth';
import { getCookie } from '../../common/cookie';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [failed,setFailed] = useState(false);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await requestLogin(username,password);
    console.log(res.status);
    if(res.status == 200){
      setFailed(false);
      window.location.href = '/';
    }else{
      setFailed(true);
    }
  };


  return (
    <div className="login-page">
      <h1>관리자 페이지</h1>
      {failed && (<h4 style={{color:"red"}}>유효하지 않은 사용자 이름 또는 비밀번호입니다.</h4>)}
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;