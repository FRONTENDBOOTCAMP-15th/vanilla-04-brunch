import { getAxios } from '../utils/axios';
import type { Posts } from './type';

class MainPageComponent extends HTMLElement {
  // 타입 가져오기
  private posts: Posts[] = [];

  constructor() {
    super();
    // 초기 상태 설정
  }

  // 컴포넌트가 DOM에 연결되었을 때 실행
  async connectedCallback() {
    const response = await this.getResponse();
    if (response) {
      this.posts = response;
      this.render();
      this.clickPost();
    }
  }

  // API 서버에세 응답을 받아오는 함수
  private async getResponse() {
    const axios = getAxios();

    try {
      const response = await axios.get('/posts');
      const posts = response.data.item;
      console.log(posts);
      return posts;
    } catch (err) {
      console.log(err);
    }
  }

  // 요즘 뜨는 브런치 게시글 렌더링하는 함수
  private render() {
    // posts 배열을 map으로 돌려서 HTML 문자열 배열 만들기
    const listHTML = this.posts.slice(0, 10).map((post, index) => {
      // content 길이 제한
      const postContent = post.content.slice(0, 50);

      // image 배열의 첫번째 요소만 가져오기
      const postImage = post.image?.[0];

      return `
        <div class="book-information" post-id="${post._id}">
          <p class="list-number">${index + 1}</p>
          <div class="book-explanation">
            <h3 class="title">${post.title}</h3>
            <span class="writer">by ${post.user.name}</span>
            <p class="extra">${postContent}</p>
          </div>
          ${post.image ? `<img src="${postImage}" alt="" />` : ``}
        </div>
        <hr />
      `;
    });
    // 배열을 하나의 문자열로 합쳐서 한 번에 innerHTML에 넣기
    this.innerHTML = `<div class="brunch-list">${listHTML.join('')}</div>`;
  }

  // 게시글 클릭 시 상세 페이지로 이동하는 함수
  private clickPost() {
    const brunchList = this.querySelector('.brunch-list') as HTMLElement;

    if (!brunchList) return;

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

customElements.define('main-page', MainPageComponent);

// // API 서버에서 응답을 받아올 함수
// async function getResponse() {
//   const axios = getAxios();

//   try {
//     const response = await axios.get('/posts'); // 타입 명시

//     const posts = response.data.item;
//     console.log(posts);
//     return posts;
//   } catch (err) {
//     console.log(err);
//   }
// }

// // 요즘 뜨는 브런치 게시글 함수
// function postBrunch(posts: Posts[]) {
//   const brunchList = document.querySelector('.brunch-list') as HTMLElement;

//   // posts 배열을 map으로 돌려서 HTML 문자열 배열 만들기
//   const listHtml = posts.slice(0, 10).map((post, index) => {
//     // content의 길이를 제한
//     const postContent = post.content.slice(0, 50);

//     // image 배열의 첫번째 요소만 가져오기
//     const postImage = post.image?.[0];
//     return `
//       <div class="book-information" post-id = "${post._id}">
//         <p class="list-number">${index + 1}</p>
//         <div class="book-explanation">
//           <h3 class="title">${post.title}</h3>
//           <span class="writer">by ${post.user.name}</span>
//           <p class="extra">${postContent}</p>
//         </div>
//         ${post.image ? `<img src="${postImage}" alt="" />` : ``}
//       </div>
//       <hr />
//     `;
//   });

//   // 배열을 하나의 문자열로 합쳐서 한 번에 innerHTML에 넣기
//   brunchList.innerHTML = listHtml.join('');

//   postListClick();
// }

// const responseData = await getResponse();
// if (responseData) {
//   postBrunch(responseData);
// }

// // 게시글 클릭 시 상세 페이지로 이동하는 함수
// function postListClick() {
//   const brunchList = document.querySelector('.brunch-list') as HTMLElement;

//   brunchList.addEventListener('click', (event) => {
//     const target = event.target as HTMLElement;

//     // 클릭된 요소가 속한 .book-information 찾기
//     // closest: 현재 element에서 가장 가까운 부모를 반환
//     const bookInfo = target.closest('.book-information') as HTMLElement;

//     if (bookInfo) {
//       // post-id 속성에서 ID 가져오기
//       // gettAttribute: DOM 요소에서 속성 값을 가져오는 함수
//       const postId = bookInfo.getAttribute('post-id');
//       location.href = `../../src/details/details.html?id=${postId}`;
//     }
//   });
// }
