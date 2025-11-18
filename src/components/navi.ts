import home from '../board/board-img/home.svg';
import search from '../board/board-img/search.svg';
import write from '../board/board-img/write.svg';
import mybox from '../board/board-img/mybox.svg';

class naviComponent extends HTMLElement {
  // 웹 컴포넌트가 DOM 연결될 때 호출되는 메서드
  // 컴포넌트 렌더링과 이벤트 초기화를 수행
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
      <div class="navi-space">
        <h6 class="sr-only">하단 네비게이션 공백</h6>
      </div>
      <nav class="navi-bar">
        <button class="navi-bar-btn" data-link="/"><img src="${home}" alt="홈" />홈</button>
        <button class="navi-bar-btn" data-link="/src/search/search.html"><img src="${search}" alt="검색하기" />발견</button>
        <button class="navi-bar-btn" data-link="/src/board/write.html"><img src="${write}" alt="글쓰기" />글쓰기</button>
        <button class="navi-bar-btn" data-link="/src/drawer/user-activity.html"><img src="${mybox}" alt="내서랍" />내 서랍</button>
      </nav>
    `;
    const naviBtn = document.querySelectorAll('.navi-bar-btn');
    naviBtn.forEach((button) => {
      const htmlBtn = button as HTMLElement;

      htmlBtn.addEventListener('click', function (event: Event) {
        const target = event.currentTarget as HTMLElement;
        const link = target.dataset.link;
        console.log('클릭된 버튼의 data-link:', link);
        if (link) {
          window.location.href = link;
        }
      });
    });
  }
}
customElements.define('navi-bar', naviComponent);
