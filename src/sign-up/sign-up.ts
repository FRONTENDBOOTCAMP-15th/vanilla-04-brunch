import { getAxios } from '../utils/axios';

// 타입을 설정하는 인터페이스
interface User {
  type: string;
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
}

// 회원가입 버튼 누르면 실행할 함수
const signUpBtn = document.querySelector('.sign-up-btn');
signUpBtn?.addEventListener('click', () => {
  onSignUp();
});

// 입력한 input의 값을 가져오는 함수
function getInputValue(inputId: string) {
  const input = document.getElementById(`${inputId}`) as HTMLInputElement;
  return input.value.trim() || '';
}

// 에러 메세지 영역 선택
function getError(Id: string) {
  return document.querySelector(`.${Id}-error`) as HTMLElement;
}

// 성공 메세지 영역 선택
function getSuccess(Id: string) {
  return document.querySelector(`.${Id}-success`) as HTMLElement;
}

// 노출할 메세지 영역 선택
function checkField(inputId: string, value: string) {
  const errorElement = getError(inputId);
  const successElement = getSuccess(inputId);

  // 요소가 없으면 false 반환
  if (!errorElement || !successElement) {
    console.error(`메세지 요소를 찾을 수 업습니다.: ${inputId}`);
    return false;
  }

  if (value === '') {
    errorElement.classList.remove('hidden');
    successElement.classList.add('hidden');
    return false;
  } else {
    errorElement.classList.add('hidden');
    successElement.classList.remove('hidden');
    return true;
  }
}

async function onSignUp() {
  const axios = getAxios();

  const type = 'user';
  const name = getInputValue('nickName');
  const email = getInputValue('email');
  const password = getInputValue('password');
  const passwordCheck = getInputValue('passwordCheck');

  const isNickNameValid = checkField('nickName', name);
  const isEmailValid = checkField('email', email);
  const isPasswordValid = checkField('password', password);
  const isPasswordCheckValid = checkField('passwordCheck', passwordCheck);

  if (!isNickNameValid || !isEmailValid || !isPasswordValid || !isPasswordCheckValid) {
    alert('모든 항목을 입력해주세요.');
    return;
  }

  try {
    const response = await axios.post<User>(`/users`, { type, name, email, password, passwordCheck });
    const users = response.data;
    console.log('회원가입 성공', users);
  } catch (err) {
    console.log(err);
    alert('별명, 이메일, 비밀번호를 다시 확인해주세요.');
  }
}
