/*
간편 로그인을 하는 경우 로그인 타입이 바뀐다

token 속성
accessToken = 만료 기간을 정하는 토큰(일정 시간을 정해서 보내면 일정 시간 후 만료)
refreshToken = 만료 기간을 갱신하는 토큰(새로운 토큰을 발급)

accessToken을 sessionStorage에 저장(그렇게 어렵지 않다)
로그인이 필요한 기능 -> accessToken이 필요
-> accessToken을 가져가서 사용하는 구조로 변경하면 된다.(token 유무로 페이지 구분)

refreschToken은 에러를 기준으로 작업한다.
-> accessToken에 비해 난이도가 있다.

http only cookie = 서버쪽에서만 접근 가능(현재는 이 방식을 주로 사용)
*/

import { getAxios } from '../utils/axios';

interface User {
  email: string;
  password: string;
}

const loginBtn = document.querySelector('.login-btn');
loginBtn?.addEventListener('click', () => {
  onLogin();
});

async function onLogin() {
  const axios = getAxios(); // axios 인스턴스 생성
  const emailInput = document.getElementById('email') as HTMLInputElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  try {
    const response = await axios.post(`/users/login?expiresln=1d`, { email, password });
    const user = response.data;
    const accessToken = user.item.token.accessToken;
    sessionStorage.setItem('accessToken', accessToken);

    console.log('로그인 성공: ', user);
    location.href = '/';
  } catch (err) {
    console.log(err);
    alert('아이디와 비밀번호를 확인해주세요.');
  }
}

const signUpBtn = document.querySelector('.sign-up-btn');
signUpBtn?.addEventListener('click', () => {
  location.href = './sign-up.html';
});
