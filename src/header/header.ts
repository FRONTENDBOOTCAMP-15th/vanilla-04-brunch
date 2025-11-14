class HeaderComponent extends HTMLElement {
  // Header 컴포넌트
  // 웹 컴포넌트가 DOM 연결될 때 호출되는 메서드
  // 컴포넌트 렌더링과 이벤트 초기화를 수행
  connectedCallback() {
    this.render();
  }

  render() {
    // 유저 로그인 유/무에 따른 헤더 모양 변화를 위한 함수 호출
    // const user = this.getUser();
    this.innerHTML = `<div class="header">
      <img class="logo" src="../header/img/black_logo.png" alt="로고" />
      <div class="bundle">
        <!-- 사용자 로그인시 나올 종 -->
        <!-- <img class="bell" src="../header/img/bell.png" alt="종 아이콘" /> -->
        <img class="search" src="../header/img/search_icon.png" alt="검색 아이콘" />

        <!-- 사용자 미로그인시 나올 버튼-->
        <button>시작하기</button>

        <!-- 사용자 로그인시 나올 프로필 사진 -->
        <!-- <img class="profile" src="../header/img/profile_header.png" alt="사용자 프로필" /> -->
      </div>
    </div>`;
  }

  // private getUser(): User {
  //   const user: User = JSON.parse(저장소.getItem("가져올 속성명") || "{}");
  //   return user;
  // }
}

customElements.define('icream-header', HeaderComponent);
