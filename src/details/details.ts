import { getAxios } from '../utils/axios';
import dayjs from 'dayjs';
import type { BookmarkPostInfo, PostAuthorInfo, PostInfo } from './type';

const token = sessionStorage.getItem('accessToken');
const userId = Number(sessionStorage.getItem('user-id'));
const params = new URLSearchParams(window.location.search); // URL 뒤에 붙는 ?id=170&sort=asc&... 같은 쿼리 스트링을 담은 객체
const postId = Number(params.get('id'));

arrayPostInfo('postId', postId);

// 상세페이지 - 데이터 get 함수
async function getDetailData(no: number) {
  const axios = getAxios(); // axios 인스턴스 생성

  try {
    const response = await axios.get(`/posts/${no}`);
    // console.log('응답 성공');
    // console.log(response);
    console.log('게시물', response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

// 상세페이지 - 페이지 로드시 랜더링 함수
function detailRender(posts: PostInfo) {
  const postsCover = document.querySelector('.article-cover') as HTMLElement;
  const postsTitle = document.querySelector('.article-title');
  const postsSubTitle = document.querySelector('.article-subtitle');
  const postsId = document.querySelector('.article-author');
  const postsDate = document.querySelector('.article-date');
  const postsContentP = document.querySelector('.article-content-p');
  const postsContentImg = document.querySelector('.article-content-figures') as HTMLElement;
  const replyTotalNum = document.querySelector('.comment-total-num');
  const replyList = document.querySelector('.comment-list') as HTMLElement;
  const postLikeNum = document.querySelector('.article-like-total');

  if (posts.image) {
    if (typeof posts.image === 'string') {
      postsCover.style.backgroundImage = `url("${posts.image}")`;
    } else {
      postsCover.style.backgroundImage = `url("${posts.image[0]}")`;
    }

    arrayPostInfo('postImg', posts.image);
  } else {
    postsCover.style.backgroundImage = `url("./images/cover-default.png")`;

    arrayPostInfo('postImg', '/src/details/images/cover-default.png');
  }
  if (postsTitle) {
    postsTitle.innerHTML = posts.title;
  }
  arrayPostInfo('postTitle', posts.title);
  if (postsSubTitle) {
    postsSubTitle.innerHTML = posts.extra.subTitle;
  }
  if (postsId) {
    postsId.innerHTML = posts.user.name;
  }
  arrayPostInfo('postAuthorName', posts.user.name);
  if (postsDate) {
    function normalize(dateString: string) {
      return dateString
        .replace(/\./g, '-') // yyyy.mm.dd → yyyy-mm-dd
        .replace(' ', 'T'); // 공백 → T (ISO 기준)
    }

    function formatDate(createdAt: string) {
      return dayjs(normalize(createdAt)).format('MMM DD. YYYY');
    }

    const result = formatDate(posts.createdAt);

    postsDate.innerHTML = result;
  }
  if (postsContentP) {
    postsContentP.innerHTML = posts.content;

    // 배열일 때와 배열이 아닐 때,
    if (typeof posts.image === 'string') {
      postsContentImg.innerHTML = posts.image;
    } else {
      const result = posts.image?.map((img) => {
        return `
          <figure class="article-content-figure">
            <img src="${img}" alt="상세페이지 연관 이미지" />
            <figcaption>상세페이지 연관 이미지</figcaption>
          </figure>
        `;
      });
      postsContentImg.innerHTML = result?.join('') ?? '';
    }
  }
  if (replyTotalNum) {
    const count = posts.replies?.length ?? 0;
    replyTotalNum.innerHTML = count.toString();
  }
  if (!posts.replies || (posts.replies?.length as number) === 0) {
    replyList.innerHTML = `
      <div class="comment-empty">
        <img class="empty-img" src="./images/brunch-icon.png" alt="brunch 심볼" />
        <p class="empty-text">작성된 댓글이 없습니다.</p>
      </div>
    `;
  } else {
    const result = posts.replies?.map((reply) => {
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
    replyList.innerHTML = result?.join('') ?? '';
  }
  if (postLikeNum) {
    const likeNum = posts.bookmarks ? posts.bookmarks : '0';
    postLikeNum.innerHTML = likeNum;
  }
}

// 상세페이지 - 2번 째 게시물 응답 데이터, (2) 임시 값 - URL로 전달 받을 값
const responseDetailData = await getDetailData(postId);

// 상세페이지 - 데이터 받아오면, 상세페이지 랜더링 실행
if (responseDetailData?.ok) {
  detailRender(responseDetailData.item);
}

// 작가(사용자) - 데이터 get 함수
async function getAuthorData(no: number) {
  const axios = getAxios();

  try {
    const response = await axios.get(`/users/${no}`);
    // console.log('응답 성공');
    // console.log(response);
    console.log('게시물에서 받아온 작가 정보', response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

// 작가(사용자) - 페이지 로드시 정보 랜더링 함수
function authorRender(authors: PostAuthorInfo) {
  const authorName = document.querySelector('.author-name');
  const authorJob = document.querySelector('.author-job');
  const authorLink = document.querySelector('.author-profile-link');
  const authorDesc = document.querySelector('.author-desc-p');
  const subsTotalNum = document.querySelector('.subscriber-total-num');

  if (authorName) {
    authorName.innerHTML = authors.name;
  }
  if (authorJob) {
    authorJob.innerHTML = authors.extra?.job ?? '';
  }
  if (authorLink) {
    if (authors.image) {
      authorLink.innerHTML = `
        <img class="author-profile-img" src="${authors.image}" alt="${authors.name}" />
      `;
    }
  }
  if (authorDesc) {
    authorDesc.innerHTML = authors.extra?.biography ?? '';
  }
  if (subsTotalNum) {
    const totalNum = authors.bookmarkedBy.users ? authors.bookmarkedBy.users : 0;
    subsTotalNum.innerHTML = totalNum.toString();
  }
}

// 작가(사용자) - 2번 쨰 게시물에 대한 데이터
const postAuthorId = responseDetailData.item.user._id;
if (postAuthorId === 0) {
  const goLogin = confirm('로그인 안된 상태에서 등록한 게시물은 삭제되었습니다. \n다른 게시물을 봐주시면 감사하겠습니다-!');
  if (goLogin) {
    window.location.href = '/';
  }
}
const responseAuthorData = await getAuthorData(postAuthorId);

// 작가(사용자) - 데이터 받아오면, 작가(사용자) 정보 랜더링 실행
if (responseAuthorData?.ok) {
  authorRender(responseAuthorData.item);
}

// 사용자 - 데이터 get 함수
async function getUserData(no: number) {
  const axios = getAxios();

  try {
    const response = await axios.get(`/users/${no}`);
    console.log('사용자 정보', response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

// 사용자 - 페이지 로드시 사용자 계정으로 댓글 입력칸 랜더링 함수
function commentRender(user: PostAuthorInfo) {
  const commentWriteBox = document.querySelector('.comment-write') as HTMLElement;

  if (token === null) {
    commentWriteBox.innerHTML = `
      <a class="comment-write-noToken" href="/src/user/login/login.html">먼저 로그인하고 댓글을 입력해 보세요!</a>
    `;
  } else {
    const writeImg = user.image ? `<img src="${user.image}" alt="${user.name}" />` : '';
    commentWriteBox.innerHTML = `
    <form class="comment-write-form">
      <div class="comment-write-box">
        <div class="comment-write-info">
          <span class="writer-img">
            ${writeImg}
          </span>
          <span class="writer-name">${user.name}</span>
        </div>
        <div class="comment-write-in">
          <label class="sr-only" for="comment-write-input">댓글을 입력하세요.</label>
          <textarea class="comment-write-input" name="comment-write-input" id="comment-write-input" placeholder="댓글을 입력하세요."></textarea>
        </div>
      </div>
      <div class="comment-append">
        <button class="comment-append-btn" type="button">등록</button>
      </div>
    </form>
  `;
  }
}

// 사용자 - 사용자 데이터, 로그인시 전달 받을 값
const responseUserData = await getUserData(userId);

// 사용자 - 데이터 받아오면, 댓글 입력칸 랜더링 실행
if (responseUserData?.ok) {
  commentRender(responseUserData.item);
}

// 사용자 북마크 데이터 get 함수
async function getBookmarkData(no: number) {
  const axios = getAxios();

  try {
    const response = await axios.get(`/users/${no}/bookmarks`);
    console.log('사용자 Bookmark 정보', response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

// 페이지 로드시 구독 버튼 랜더링 함수
function bookmarkRender(bookmarkUser: BookmarkPostInfo) {
  const subsBtn = document.querySelector('.subscribe-btn') as HTMLElement;
  const subsText = document.querySelector('.subscribe-text') as HTMLElement;
  const likeIcon = document.querySelector('.article-like-icon') as HTMLElement;
  const postLikeBtn = document.querySelector('.article-like-btn') as HTMLElement;

  if (token === null) {
    subsBtn.classList.remove('subscribe-check');
    subsText.textContent = '구독';
    subsBtn.dataset.subscribe = 'false';
  } else {
    // 사용자의 유저 북마크 중에 북마크한 작가의 id와 게시물에 대한 작가 id가 동일 시 결과 반환
    const subsResult = bookmarkUser.user.find((item) => item.user._id === responseAuthorData.item._id);

    if (subsResult) {
      subsBtn.classList.add('subscribe-check');
      subsText.textContent = '구독중';
      subsBtn.dataset.subscribe = 'true';
    } else {
      subsBtn.classList.remove('subscribe-check');
      subsText.textContent = '구독';
      subsBtn.dataset.subscribe = 'false';
    }

    const likeResult = bookmarkUser.post.find((item) => item.post._id === postId);

    if (likeResult) {
      likeIcon.style.backgroundPositionX = '0';
      postLikeBtn.dataset.like = 'true';
    } else {
      postLikeBtn.dataset.like = 'false';
    }
  }
}

// 북마크 데이터, 로그인시 전달 받을 값
const responseBookmarkData = await getBookmarkData(userId);

// 사용자 북마크 데이터 받아오면, 구독 버튼 랜더링 실행
if (responseBookmarkData?.ok) {
  bookmarkRender(responseBookmarkData.item);
}

// 북마크 추가 함수
async function postBookmark(type: string, no: number) {
  const axios = getAxios();

  try {
    const response = await axios.post(`/bookmarks/${type}`, { target_id: no });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

// 북마크 목록 조회 함수
async function getBookmark(key: string, no: number) {
  const axios = getAxios();

  try {
    const response = await axios.get(`/bookmarks/${key}/${no}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

// 북마크 삭제 함수
async function deleteBookmark(no: number) {
  const axios = getAxios();

  try {
    const response = await axios.delete(`/bookmarks/${no}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

// 구독 버튼 동작에 따른 랜더링 함수
function bookmarkActiveRender() {
  const subsBtn = document.querySelector('.subscribe-btn') as HTMLElement;
  const subsText = document.querySelector('.subscribe-text') as HTMLElement;
  const likeBtn = document.querySelector('.article-like-btn') as HTMLElement;
  const likeIcon = document.querySelector('.article-like-icon') as HTMLElement;

  if (token === null) {
    subsBtn.addEventListener('click', () => goLogin);
    likeBtn.addEventListener('click', () => goLogin);

    function goLogin() {
      const goLogin = confirm('로그인이 필요합니다. 로그인 페이지로 이동할까요?');
      if (goLogin) {
        window.location.href = '/src/user/login/login.html';
      }
    }
  } else {
    // 구독 버튼
    subsBtn.addEventListener('click', async () => {
      if (subsBtn.dataset.subscribe === 'true') {
        const responseGetBookmarkData = await getBookmark('user', responseAuthorData.item._id);

        if (responseGetBookmarkData?.ok) {
          const responseDeleteBookmark = await deleteBookmark(responseGetBookmarkData.item._id);

          const updatedAuthor = await getAuthorData(responseAuthorData.item._id);
          if (updatedAuthor?.ok) {
            authorRender(updatedAuthor.item);
          }

          if (responseDeleteBookmark?.ok) {
            subsBtn.classList.remove('subscribe-check');
            subsText.textContent = '구독';
            subsBtn.dataset.subscribe = 'false';
          }
        }
      } else {
        const responsePostBookmark = await postBookmark('user', responseAuthorData.item._id);

        if (responsePostBookmark?.ok) {
          subsBtn.classList.add('subscribe-check');
          subsText.textContent = '구독중';
          subsBtn.dataset.subscribe = 'true';

          const updatedAuthor = await getAuthorData(responseAuthorData.item._id);
          if (updatedAuthor?.ok) {
            authorRender(updatedAuthor.item);
          }
        }
      }
    });

    // 좋아요 버튼
    likeBtn.addEventListener('click', async () => {
      if (likeBtn.dataset.like === 'true') {
        const responseGetBookmarkData = await getBookmark('post', postId);

        if (responseGetBookmarkData?.ok) {
          const responseDeleteBookmark = await deleteBookmark(responseGetBookmarkData.item._id);

          const updatedLike = await getDetailData(postId);

          if (updatedLike?.ok) {
            detailRender(updatedLike.item);
          }

          if (responseDeleteBookmark?.ok) {
            likeIcon.style.backgroundPositionX = '21px';
            likeBtn.dataset.like = 'false';
          }
        }
      } else {
        const responsePostBookmark = await postBookmark('post', postId);

        if (responsePostBookmark?.ok) {
          likeIcon.style.backgroundPositionX = '0';
          likeBtn.dataset.like = 'true';

          const updatedLike = await getDetailData(postId);

          if (updatedLike?.ok) {
            detailRender(updatedLike.item);
          }
        }
      }
    });
  }
}

bookmarkActiveRender();

// 최근 본 정보 세션스토리지에 저장
function arrayPostInfo(key: string, value: number | string | string[]) {
  const bringPostId = sessionStorage.getItem(key);
  // console.log(bringPostId);

  if (!bringPostId) {
    sessionStorage.setItem(key, JSON.stringify([value]));
    return;
  }

  const parsePostId = JSON.parse(bringPostId);
  const postIdArr = Array.isArray(parsePostId) ? parsePostId : [];
  // console.log(postIdArr);

  postIdArr.push(value);

  sessionStorage.setItem(key, JSON.stringify(postIdArr));
}
