import dayjs from 'dayjs';
import { getAxios } from '../utils/axios';
import type { authorInfo, postInfo } from './type';

const searchInput = document.querySelector('#search-input-field') as HTMLInputElement;
const searchTabList = document.querySelector('.search-tab-list') as HTMLElement;
const searchPostsTab = document.querySelector('.search-posts-tab') as HTMLElement;
const searchAuthorsTab = document.querySelector('.search-authors-tab') as HTMLElement;
const searchInputClearBtn = document.querySelector('.search-input-clear-btn') as HTMLElement;
const searchKeywords = document.querySelector('.search-keywords') as HTMLElement;
const searchRecent = document.querySelector('.search-recent') as HTMLElement;
const searchPosts = document.querySelector('.search-result-posts') as HTMLElement;
const searchAuthors = document.querySelector('.search-result-authors') as HTMLElement;
const searchPostsTotal = document.querySelector('.search-posts-total') as HTMLElement;
const searchAuthorsTotal = document.querySelector('.search-author-total') as HTMLElement;
const urlParams = new URLSearchParams(window.location.search); // window.location.search는 URL 뒤에 붙는 쿼리 스트링, URLSearchParams는 키-값으로 사용할 수 있게 객체 생성

// 검색어 값이 변경될 때마다 클리어 버튼 활성/비활성화
searchInput.addEventListener('input', async () => {
  const inputValue = searchInput.value.trim();
  console.log(inputValue);

  if (inputValue.length) {
    urlParams.set('q', inputValue); // 'q'(key) 키가 있으면 키 값 업데이트, 없으면 새로 추가
    searchInputClearBtn.classList.add('show-btn');
    searchKeywords.classList.add('hide-keywords');
    searchRecent.classList.add('hide-recent');
    searchTabList.classList.add('show-tab');
    searchPosts.classList.add('show-posts');

    // 게시물 데이터 응답, 해당 키워드를 가진 게시물을 배열로 전달 받음
    const postsDataArr = await getPostsData(inputValue);
    // 검색어를 입력하면 입력할 때마다 서버에 요청을 보냄... 요청을 많이 보내면 안 좋을 것 같다...
    // 텍스트의 순서에 관계없이 각각의 텍스트만 갖고있어도 게시글이 출력됌...

    if (postsDataArr?.ok) {
      searchPostRender(postsDataArr.item);
    }

    const authorsDataArr = await getAuthorsData();

    if (authorsDataArr?.ok) {
      searchAuthorRender(authorsDataArr.item, inputValue);
    }
  } else {
    searchInputClearBtn.classList.remove('show-btn');
    searchKeywords.classList.remove('hide-keywords');
    searchRecent.classList.remove('hide-recent');
    searchTabList.classList.remove('show-tab');
    searchPosts.classList.remove('show-posts');
  }

  updateSearch(); // 검색어 및 URL 업데이트 함수
});

// 검색어 클리어 버튼
searchInputClearBtn.addEventListener('click', () => {
  searchInput.value = '';
  searchInputClearBtn.classList.remove('show-btn');
  searchInputClearBtn.classList.remove('input-clear');
  searchInputClearBtn.classList.remove('show-btn');
  searchKeywords.classList.remove('hide-keywords');
  searchRecent.classList.remove('hide-recent');
  searchTabList.classList.remove('show-tab');
  searchPosts.classList.remove('show-posts');

  updateSearch(); // 검색어 및 URL 업데이트 함수
});

// 작가 버튼 클릭 이벤트
searchAuthorsTab.addEventListener('click', () => {
  const isAuthorsTab = searchAuthorsTab.classList.contains('search-authors-tab');
  console.log(isAuthorsTab);

  if (isAuthorsTab) {
    searchAuthorsTab.classList.add('active');
    searchPostsTab.classList.remove('active');
    searchPosts.style.display = 'none';
    searchAuthors.style.display = 'block';
  }
});

// 글 버튼 클릭 이벤트
searchPostsTab.addEventListener('click', () => {
  const isPostsTab = searchPostsTab.classList.contains('search-posts-tab');
  console.log(isPostsTab);

  if (isPostsTab) {
    searchPostsTab.classList.add('active');
    searchAuthorsTab.classList.remove('active');
    searchAuthors.style.display = 'none';
    searchPosts.style.display = 'block';
  }
});

// 검색어 및 URL 업데이트 함수
function updateSearch() {
  if (!searchInput.value.trim().length) {
    // console.log(urlParams); // size: 1
    urlParams.delete('q'); // 'q'(key) 키 제거
    // console.log(urlParams); // size: 0, 데이터상으론 지워짐
  }

  const currentPath = window.location.pathname;

  const newUrl = currentPath + (urlParams.toString() ? '?' + urlParams.toString() : '');
  // console.log(newUrl);

  // pushState(stateObj, title, url) stateObj: 앞/뒤로가기 할 때 복구할 추가 정보, title: 비워두는게 일반적, url: url
  window.history.pushState(null, '', newUrl); // 페이지 리로드 없이, 브라우저 히스토리에 URL만 업데이트, 뒤로가기 누르면 이전 검색어로 돌아감
}

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

// 검색어에 해당하는 게시물 랜더링 함수
function searchPostRender(postsData: postInfo[]) {
  const postList = document.querySelector('.search-posts-list') as HTMLElement;

  searchPostsTotal.innerHTML = postsData.length.toString();

  const result = postsData.map((post) => {
    const imgSrc = Array.isArray(post.image) ? (post.image.length > 0 ? post.image[0] : './images/cover-default.png') : post.image || './images/cover-default.png';

    // HTML 형태의 문자열에서 태그를 제거하고 순수 텍스트만 추출하는 함수
    const div = document.createElement('div');
    div.innerHTML = post.content;
    const contentText = div.textContent ? div.textContent : '';

    // dayjs 라이브러리 사용하여 시간 UI 변경 ...
    function normalize(dateString: string) {
      return dateString
        .replace(/\./g, '-') // yyyy.mm.dd → yyyy-mm-dd
        .replace(' ', 'T'); // 공백 → T (ISO 기준)
    }

    function formatDate(createdAt: string) {
      return dayjs(normalize(createdAt)).format('MMM DD. YYYY');
    }

    const date = formatDate(post.createdAt);
    // ... dayjs 라이브러리 사용하여 시간 UI 변경

    return `
      <div class="search-posts-item">
        <a href="/src/details/details.html?id=${post._id}">
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

// 작가 데이터 요청 함수
async function getAuthorsData() {
  const axios = getAxios();

  try {
    const authorsData = await axios.get(`/users/`);
    console.log(authorsData.data);
    return authorsData.data;
  } catch (err) {
    console.log(err);
  }
}

// 검색어에 해당하는 작가 랜더링 함수
function searchAuthorRender(authorsData: authorInfo[], keyword: string) {
  const authorList = document.querySelector('.search-author-list') as HTMLElement;

  // 이름이나 소개에 검색어가 포함된 작가만 필터링
  const filteredAuthors = authorsData.filter((author) => {
    const name = author.name ?? '';
    const bio = author.extra?.biography ?? '';

    return name.includes(keyword) || bio.includes(keyword);
  });

  // 총 개수 표시
  searchAuthorsTotal.innerHTML = filteredAuthors.length.toString();

  const result = filteredAuthors.map((author) => {
    const imgSrc = Array.isArray(author.image) ? (author.image.length > 0 ? author.image[0] : './images/cover-default.png') : author.image || './images/cover-default.png';

    const keywordListHtml =
      author.extra?.keyword
        ?.map((key) => {
          return `
        <li class="search-author-keyword"><a href="">${key}</a></li>
      `;
        })
        .join('') ?? '';

    return `
      <div class="search-author-item">
        <div class="search-author-profile">
          <a href="/src/writer-home/writer-home.html?id=${author._id}">
            <img src="${imgSrc}" alt="${author.name}" />
          </a>
        </div>
        <div class="search-author-text">
          <strong class="search-author-id">
            <a href="/src/writer-home/writer-home.html?id=${author._id}">${author.name}</a>
          </strong>
          <p class="search-author-desc">${author.extra?.biography ?? ''}</p>
          <ul class="search-author-keywords">
            ${keywordListHtml}
          </ul>
        </div>
      </div>
    `;
  });

  authorList.innerHTML = result.join('');
}
