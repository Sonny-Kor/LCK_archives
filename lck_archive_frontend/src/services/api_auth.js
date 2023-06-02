import axios from 'axios';
import { getCookie, setCookie } from '../common/cookie';

const api = axios.create({
  baseURL: 'localhost:3010'
});

const requestLogin = async (username, password) =>{
  try {
    const response = await fetch('http://localhost:3010/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "a_id": Number(username),
        "a_pw": password
      }),
    });
    if (response.ok) {
      const data = await response.json();
      const { token } = data;
      setCookie("access_token",token);
      console.log('로그인 성공');
      return {
        status: 200,
        data: response.data
      };
    } else {
      return {
        status: 400,
      };
    }
  } catch (error) {
    return {
      status: 500,
    };
  }
};

export {requestLogin};