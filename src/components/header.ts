import homeLogo from '../header/img/black_logo.png';
import bell from '../header/img/bell.png';
import search from '../header/img/search_icon.png';
import profile from '../header/img/profile_header.png';

class HeaderComponent extends HTMLElement {
  // Header 컴포넌트
  // 웹 컴포넌트가 DOM 연결될 때 호출되는 메서드
  // 컴포넌트 렌더링과 이벤트 초기화를 수행
  // 커스텀 엘리먼트를 상속 받아야 사용 가능
  // Web Components API
  connectedCallback() {
    this.render();
  }

  // 프레임워크 메서드
  render() {
    const token = sessionStorage.getItem('accessToken');
    // 유저 로그인 유/무에 따른 헤더 모양 변화를 위한 함수 호출
    // const user = this.getUser();
    this.innerHTML = `<div class="header">
      <a href="/"><img class="logo" src="${homeLogo}" alt="로고" /></a>
      ${
        token
          ? `
          <div class="bundle">
            <img class="bell" src="${bell}" alt="종 아이콘" />
            <a href="/src/search/search.html"><img class="search" src="${search}" alt="검색 아이콘" /></a>
            <img class="profile" src="${profile}" alt="사용자 프로필" />
          </div>
          `
          : `
          <div class="bundle">
            <a href="/src/search/search.html"><img class="search" src="${search}" alt="검색 아이콘" /></a>
            <a class="start-btn" href="/src/sign-up/login.html">시작하기</a>
          </div>
          `
      }
    </div>`;
  }

  // private getUser(): User {
  //   const user: User = JSON.parse(저장소.getItem("가져올 속성명") || "{}");
  //   return user;
  // }
}

customElements.define('icream-header', HeaderComponent);
