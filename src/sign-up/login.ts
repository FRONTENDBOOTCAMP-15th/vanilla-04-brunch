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
    const response = await axios.post<User>(`/users/login`, { email, password });
    const user = response.data;
    console.log('로그인 성공: ', user);
  } catch (err) {
    console.log(err);
    alert('아이디와 비밀번호를 확인해주세요.');
  }
}

const signUpBtn = document.querySelector('.sign-up-btn');
signUpBtn?.addEventListener('click', () => {
  location.href = './sign-up.html';
});
