import { getAxios } from '../utils/axios';
import dayjs from 'dayjs';
import type { PostInfo } from './type';

async function getData() {
  const axios = getAxios(); // axios 인스턴스 생성

  try {
    const response = await axios.get('/posts/2');
    // console.log('응답 성공');
    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

function render(posts: PostInfo) {
  const postsCover = document.querySelector('.article-cover') as HTMLElement;
  const postsTitle = document.querySelector('.article-title');
  const postsSubTitle = document.querySelector('.article-subtitle');
  const postsId = document.querySelector('.article-author');
  const postsDate = document.querySelector('.article-date');
  const postsContent = document.querySelector('.article-content');
  const replyTotalNum = document.querySelector('.comment-total-num');
  const replyList = document.querySelector('.comment-list') as HTMLElement;

  if (posts.image) {
    postsCover.style.backgroundImage = `url("${posts.image}")`;
  } else {
    postsCover.style.backgroundImage = `url("./images/cover-default.png")`;
  }
  if (postsTitle) {
    postsTitle.innerHTML = posts.title;
  }
  if (postsSubTitle) {
    postsSubTitle.innerHTML = posts.extra.subTitle;
  }
  if (postsId) {
    postsId.innerHTML = posts.user.name;
  }
  if (postsDate) {
    function normalize(dateString: string) {
      return dateString
        .replace(/\./g, '-') // yyyy.mm.dd → yyyy-mm-dd
        .replace(' ', 'T'); // 공백 → T (ISO 기준)
    }

    function formatDate(createdAt: string) {
      return dayjs(normalize(createdAt)).format('MMM DD. YYYY');
    }

    // 사용
    const result = formatDate(posts.createdAt);

    postsDate.innerHTML = result;
  }
  if (postsContent) {
    postsContent.innerHTML = posts.content; // 글쓰기와 연동해서 질문
  }
  if (replyTotalNum) {
    replyTotalNum.innerHTML = posts.replies.length.toString(); // 타입 문제 질문
  }
  if ((posts.replies.length as number) === 0) {
    replyList.innerHTML = `
      <div class="comment-empty">
        <img class="empty-img" src="./images/brunch-icon.png" alt="brunch 심볼" />
        <p class="empty-text">작성된 댓글이 없습니다.</p>
      </div>
    `;
  } else {
    const result = posts.replies.map((reply) => {
      return `
        <li class="comment-item">
          <div class="item-flex">
            <a class="user-profile" href="">
              <img class="user-profile-img" src="${reply.user.image}" alt="${reply.user.name}" />
            </a>
            <div class="comment-info">
              <div class="name-date">
                <a class="user-name" href="">${reply.user.name}</a>
                <span class="comment-date">Jul 23. 2024</span>
              </div>
              <div class="comment-view">
                <p class="comment-view-p">${reply.content}</p>
              </div>
              <button class="comment-write-btn" type="button">답글달기</button>
              <button class="comment-action-btn" type="button">
                <img src="./images/comment-settings-icon.png" alt="댓글 설정" />
              </button>
            </div>
          </div>
        </li>
      `;
    });
    replyList.innerHTML = result.join('');
  }
}

const responseData = await getData();

if (responseData?.ok) {
  render(responseData.item);
}
