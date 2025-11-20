import { getAxios } from '../utils/axios';
import type { Posts } from './type';

// API 서버에서 응답을 받아올 함수
async function getResponse() {
  const axios = getAxios();

  try {
    const response = await axios.get('/posts'); // 타입 명시
    const posts = response.data.item;
    console.log(posts);
    return posts;
  } catch (err) {
    console.log(err);
  }
}

// 요즘 뜨는 브런치 게시글 함수
function postBrunch(posts: Posts[]) {
  const brunchList = document.querySelector('.brunch-list') as HTMLElement;

  // posts 배열을 map으로 돌려서 HTML 문자열 배열 만들기
  // img src 란에 ${post.image} 추가 해줘야함(혜진님 작업 끝나면 추가 예정)
  const listHtml = posts.slice(0, 10).map((post, index) => {
    return `
      <div class="book-information">
        <p class="list-number">${index + 1}</p>
        <div class="book-explanation">
          <h3 class="title">${post.title}</h3>
          <span class="writer">${post.user.name}</span>
          <p class="extra">${post.extra}</p>
        </div>
        <img class="banner" src="" alt="이미지 ID: ${post._id}" />
      </div>
      <hr />
    `;
  });

  // 배열을 하나의 문자열로 합쳐서 한 번에 innerHTML에 넣기
  brunchList.innerHTML = listHtml.join('');
}

const responseData = await getResponse();
if (responseData) {
  postBrunch(responseData);
}
