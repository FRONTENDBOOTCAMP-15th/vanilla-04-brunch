import kakaoLogo from '../footer/img/kakao.png';
import facebookLogo from '../footer/img/facebook.png';
import xLogo from '../footer/img/x.png';
import footerLogo from '../footer/img/white_logo.png';

class FooterComponent extends HTMLElement {
  // Footer 컴포넌트
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<div class="footer">
      <div>
        <div class="sns-div">
          <img class="kakao" src="${kakaoLogo}" alt="kakao-sns" />
          <img class="facebook" src="${facebookLogo}" alt="facebook-sns" />
          <img class="x" src="${xLogo}" alt="X-sns" />
        </div>
        <div class="p-list">
          <p>이용약관</p>
          <p>이전 이용약관</p>
          <p>카카오 유료서비스 이용약관</p>
          <p class="course">카카오 개인정보 처리방침</p>
          <p>청소년 보호정책</p>
          <p>운영정책</p>
        </div>
        <div class="footer-title">
          <img class="logo" src="${footerLogo}" alt="로고" />
        </div>
      </div>
    </div>`;
  }
}

customElements.define(`icream-footer`, FooterComponent);
