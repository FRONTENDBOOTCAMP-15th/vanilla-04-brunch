import dayjs from 'dayjs';
import { getAxios } from '../utils/axios';
import type { postInfo } from './type';

const searchInput = document.querySelector('#search-input-field') as HTMLInputElement;
const searchTab = document.querySelector('.search-tab-list') as HTMLInputElement;
const searchInputClearBtn = document.querySelector('.search-input-clear-btn') as HTMLElement;
const searchKeywords = document.querySelector('.search-keywords') as HTMLElement;
const searchRecent = document.querySelector('.search-recent') as HTMLElement;
const searchPosts = document.querySelector('.search-result-posts') as HTMLElement;
const searchAuthors = document.querySelector('.search-result-authors') as HTMLElement;

// 검색어 값이 변경될 때마다 클리어 버튼 활성/비활성화
searchInput.addEventListener('input', () => {
  const inputValue = searchInput.value.trim();
  const urlParams = new URLSearchParams(window.location.search);

  if (inputValue.length) {
    urlParams.set('q', inputValue);
    searchInputClearBtn.classList.add('show-btn');
    searchKeywords.classList.add('hide-keywords');
    searchRecent.classList.add('hide-recent');
    searchTab.classList.add('show-tab');
    searchPosts.classList.add('show-posts');
  } else {
    urlParams.delete('q');
    searchInputClearBtn.classList.remove('show-btn');
    searchKeywords.classList.remove('hide-keywords');
    searchRecent.classList.remove('hide-recent');
    searchTab.classList.remove('show-tab');
    searchPosts.classList.remove('show-posts');
  }

  const currentPath = window.location.pathname;
  console.log(currentPath);

  const newUrl = currentPath + (urlParams.toString() ? '?' + urlParams.toString() : '');

  window.history.pushState(null, '', newUrl);
});

// 검색어 클리어 버튼
searchInputClearBtn.addEventListener('click', () => {
  const urlParams = new URLSearchParams(window.location.search);

  urlParams.delete('q');

  searchInput.value = '';
  searchInputClearBtn.classList.remove('show-btn');
  searchInputClearBtn.classList.remove('input-clear');
  searchInputClearBtn.classList.remove('show-btn');
  searchKeywords.classList.remove('hide-keywords');
  searchRecent.classList.remove('hide-recent');
  searchTab.classList.remove('show-tab');
  searchPosts.classList.remove('show-posts');

  const currentPath = window.location.pathname;
  const newUrl = currentPath + (urlParams.toString() ? '?' + urlParams.toString() : '');

  window.history.pushState(null, '', newUrl);
});

// 글, 작가 탭 버튼

// 게시판 API 통신으로 응답반은 데이터 사용
// 전체 리스트 데이터를 사용하는 것인데.. 먼저 전체 리스트 데이터를 뿌리는 것보다 찾고자하는 검색어와 내용을 대조한 후에 출력하는게 좋을듯
// 그렇다면,
// 응답받은 데이터에서 제목/내용 중에서 검색한 단어와 동일한 단어가 있다면,
// 배열에 담아서 해당 리스트들을 출력

// 게시물 데이터 요청 함수
async function getPostsData(value: string) {
  const axios = getAxios();

  try {
    const postsData = await axios.get(`/posts?keyword=${value}`, { timeout: 1000 * 15 });
    console.log(postsData.data);
    return postsData.data;
  } catch (err) {
    console.log(err);
  }
}

// 게시물 데이터 응답
const postsDataArr = await getPostsData('발표'); // '사람' 키워드를 가진 게시물을 배열로 전달 받음 // 인자는 추후 검색시 해당하는 키워드를 URL에서 실시간으로? 받음

if (postsDataArr?.ok) {
  searchPostRender(postsDataArr.item);
}

// 키워드에 해당하는 게시물 랜더링 함수
function searchPostRender(postsData: postInfo[]) {
  const postList = document.querySelector('.search-posts-list') as HTMLElement;

  const result = postsData.map((post) => {
    const imgSrc = Array.isArray(post.image) ? (post.image.length > 0 ? post.image[0] : './images/cover-default.png') : post.image || './images/cover-default.png';

    function stripHtml(html: string): string {
      const div = document.createElement('div');
      div.innerHTML = html;
      return div.textContent || div.innerText || '';
    }

    const contentText = stripHtml(post.content);

    function normalize(dateString: string) {
      return dateString
        .replace(/\./g, '-') // yyyy.mm.dd → yyyy-mm-dd
        .replace(' ', 'T'); // 공백 → T (ISO 기준)
    }

    function formatDate(createdAt: string) {
      return dayjs(normalize(createdAt)).format('MMM DD. YYYY');
    }

    const date = formatDate(post.createdAt);

    return `
      <div class="search-posts-item">
        <a href="">
          <strong class="search-posts-title">${post.title}</strong>
          <div class="flex-box">
            <div class="text-box">
              <p class="search-posts-text">${contentText}</p>
              <span class="search-posts-date">${date}</span>
              <span class="search-posts-id">
                <img src="./images/by.png" alt="by" />
                ${post.user.name}
              </span>
            </div>
            <div class="img-box">
              <img src="${imgSrc}" alt="${post.title}" />
            </div>
          </div>
        </a>
      </div>
    `;
  });

  postList.innerHTML = result.join('');
}
