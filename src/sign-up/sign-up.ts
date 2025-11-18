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

// 회원가입 함수
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

// 별명 중복 확인 버튼 클릭 시 실행되는 비동기 함수
const duplicateName = document.querySelector('.name-information > button');
duplicateName?.addEventListener('click', async () => {
  const axios = getAxios();

  const error1 = document.querySelector('.nickName-error');
  const error2 = document.querySelector('.duplicate-nickName-error');
  const success = document.querySelector('.nickName-success');
  const name = getInputValue('nickName');

  try {
    // Parameters가 쿼리를 요구하기 때문에 ?name=${name}으로 전달해줘야함
    // 특수문자로 에러가 나는 경우 encodeURIComponent를 찾아보기
    const response = await axios.get(`/users/name?name=${name}`);
    if (response.data.ok === 1) {
      success?.classList.remove('hidden');
      error1?.classList.add('hidden');
      error2?.classList.add('hidden');
    }
  } catch (err) {
    console.log(err);
    if (name === '') {
      error1?.classList.remove('hidden');
      error2?.classList.add('hidden');
    } else {
      error2?.classList.remove('hidden');
      error1?.classList.add('hidden');
    }
  }
});

// 이메일 중복 확인 버튼 클릭 시 실행되는 비동기 함수
const duplicateEmail = document.querySelector('.email-information > button');
duplicateEmail?.addEventListener('click', async () => {
  const axios = getAxios();

  const error1 = document.querySelector('.email-error');
  const error2 = document.querySelector('.duplicate-email-error');
  const success = document.querySelector('.email-success');
  const email = getInputValue('email');

  try {
    // Parameters가 쿼리를 요구하기 때문에 ?name=${name}으로 전달해줘야함
    // 특수문자로 에러가 나는 경우 encodeURIComponent를 찾아보기
    const response = await axios.get(`/users/email?email=${email}`);
    if (response.data.ok === 1) {
      success?.classList.remove('hidden');
      error1?.classList.add('hidden');
      error2?.classList.add('hidden');
    }
  } catch (err) {
    console.log(err);
    if (email === '') {
      error1?.classList.remove('hidden');
      error2?.classList.add('hidden');
    } else {
      error2?.classList.remove('hidden');
      error1?.classList.add('hidden');
    }
  }
});

// 비밀번호, 비밀번호 확인 눈모양 이미지 클릭하면 실행되는 함수
