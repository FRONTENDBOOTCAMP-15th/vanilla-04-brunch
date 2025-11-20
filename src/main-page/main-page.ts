// axios 인스턴스와 type.ts 파일 가져오기
import { getAxios } from '../utils/axios';
import type { Posts, Users } from './type.ts';

// 클래스 선언 및 HTMLElement를 상속 받음
class MainPageComponent extends HTMLElement {
  // private를 사용하면 외부에서는 접근할 수 없다.
  // 타입 가져오기
  private posts: Posts[] = [];
  private users: Users[] = [];

  // 생성자 함수
  // super()를 호출 함으로써 부모 클래스의 생성자를 호출한다.
  constructor() {
    super();
    // 초기 상태 설정
  }

  // 컴포넌트가 DOM에 연결되었을 때 실행(생명주기 메서드)
  async connectedCallback() {
    // 2개의 api 동시 호출
    const [postResponse, usersResponse] = await this.getResponse();
    if (postResponse) {
      this.posts = postResponse;
    }

    if (usersResponse) {
      this.users = usersResponse;
    }
    this.render();
    this.clickPost();
  }

  // API 서버에세 응답을 받아오는 함수
  private async getResponse() {
    const axios = getAxios();

    try {
      // axios.all 사용
      // Promise.all: 두 개의 API 요청을 병렬로 실행
      const [postsResponse, usersResponse] = await Promise.all([
        axios.get('/posts'),
        axios.get('/users', {
          // params를 사용하여 쿼리 파라미터로 변환
          params: {
            sort: JSON.stringify({ 'bookmarkedBy.users': -1 }),
          },
        }),
      ]);

      const posts = postsResponse.data.item;
      const users = usersResponse.data.item;

      console.log('posts:', posts);
      console.log('users:', users);

      return [posts, users];
    } catch (err) {
      console.log(err);
      return [null, null];
    }
  }

  // 요즘 뜨는 브런치 게시글 렌더링하는 함수
  private render() {
    // posts 배열을 map으로 돌려서 HTML 문자열 배열 만들기
    const listHTML = this.posts.slice(0, 10).map((post, index) => {
      // content 길이 제한
      const postContent = post.content.slice(0, 50);

      // image 배열의 첫번째 요소만 가져오기
      // image가 없는 경우 실행 x
      const postImage = post.image?.[0];

      return `
        <div class="book-information" post-id="${post._id}">
          <p class="list-number">${index + 1}</p>
          <div class="book-explanation">
            <h3 class="title">${post.title}</h3>
            <span class="writer-name">by ${post.user.name}</span>
            <p class="extra">${postContent}</p>
          </div>
          ${post.image ? `<img src="${postImage}" alt="" />` : ``}
        </div>
        <hr />
      `;
    });

    const wirterListHTML = this.users.slice(0, 10).map((user, index) => {
      const biography = user.extra?.biography.slice(0, 25);
      // user의 type이 seller인 경우에만 렌더링
      return `
      
      ${
        user.type === 'seller'
          ? `<div class="writer${index + 1}">
          <a href="./src/writer-home/writer-home.html">
            <figure class="writer">
              <img src="${user.image}" alt="" />
              <figcaption class="title">${user.name}</figcaption>
              <figcaption class="job">${user.extra?.job || ''}</figcaption>
              <figcaption class="text">${biography || ''}...</figcaption>
            </figure>
          </div>`
          : ``
      }
`;
    });

    // 배열을 하나의 문자열로 합쳐서 한 번에 innerHTML에 넣기
    // join(''): 배열의 모든 문자열을 하나로 합친다.
    this.innerHTML = `<div class="main-page">
        <div class="banner">
          <p class="book-title">멈추어 버린 시간</p>
          <p class="book-writer">by 김수정</p>
          <img src="../src/main-page/img/banner.png" alt="배너 사진" />
        </div>
        
        <div class="brunch">
          <div class="brunch-list-title">
            <p>Today's Pick</p>
            <h2>요즘 뜨는 브런치</h2>
          </div>
          <ul class="brunch-list">
            ${listHTML.join('')}
          </ul>
        </div>

        <div class="hot-writer">
          <h3>구독자 급등 작가</h3>
          <div class="writer-list">
            ${wirterListHTML.join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 게시글 클릭 시 상세 페이지로 이동하는 함수
  private clickPost() {
    // .brunch-list 요소를 찾아서 선택
    // as HTMLElement: 반환 값이 HTMLElement임을 명시하는 타입 단언
    const brunchList = this.querySelector('.brunch-list') as HTMLElement;

    // brunchList가 없는 경우 종료
    if (!brunchList) return;

    // 클릭했을 때 실행할 코드
    brunchList.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      // 클릭된 요소가 속한 .book-information 찾기
      // closest: 현재 element에서 가장 가까운 부모를 반환
      const bookInfo = target.closest('.book-information') as HTMLElement;

      if (bookInfo) {
        // post-id 속성에서 ID 가져오기
        // getAttribute: DOM 요소에서 속성 값을 가져오는 함수
        const postId = bookInfo.getAttribute('post-id');
        location.href = `/src/details/details.html?id=${postId}`;
      }
    });
  }
}

// 커스텀 엘리먼트를 등록하여 컴포넌트 이름을 정함
customElements.define('main-page', MainPageComponent);
