import { getAxios } from '../utils/axios';

// 1. 게시글
export interface PostInfo {
  _id: number;
  type: string;
  title: string;
  extra: {
    subTitle: string;
  };
  image: string;
  content: string;
  user: {
    _id: number;
    name: string;
    image: string;
  };
  likes: number;
  createdAt: string;
  updatedAt: string;
}

// 2. 프로필
export interface WriterProfile {
  _id: number;
  name: string;
  job: string;
  image: string;
  bookmarkedBy: number;
  bookmark: number;
  isSubscribed: boolean;
}

const axiosInstance = getAxios();

// 3. 프로필
function renderProfile(profile: WriterProfile) {
  const nameEl = document.querySelector('.profile-name') as HTMLParagraphElement;
  const jobEl = document.querySelector('.profile-job') as HTMLParagraphElement;
  const subscriberEl = document.querySelector('.subscriber-number') as HTMLParagraphElement;
  const interestEl = document.querySelector('.interest-number') as HTMLParagraphElement;
  const imageEl = document.querySelector('.profile-image') as HTMLImageElement;
  const buttonEl = document.querySelector('.profile-btn button') as HTMLButtonElement;

  if (nameEl) nameEl.textContent = profile.name;
  if (jobEl) jobEl.textContent = profile.job;

  if (subscriberEl) subscriberEl.textContent = String(profile.bookmarkedBy);
  if (interestEl) interestEl.textContent = String(profile.bookmark);

  if (imageEl) imageEl.src = profile.image;

  if (buttonEl) {
    buttonEl.textContent = profile.isSubscribed ? '✓ 구독중' : '구독하기';
    if (profile.isSubscribed) buttonEl.classList.add('active');
    else buttonEl.classList.remove('active');
  }
}

// 4. 글 목록
// 텍스트만 추출하게 함
function stripHtml(html: string): string {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
}

function renderPosts(posts: PostInfo[]) {
  const container = document.querySelector('.writer-container');
  if (!container) return;

  document.querySelectorAll('.writing-box').forEach((box) => box.remove());

  posts.forEach((post) => {
    const articleBox = document.createElement('div');
    articleBox.className = 'writing-box';
    articleBox.style.cursor = 'pointer';

    articleBox.addEventListener('click', () => {
      window.location.href = `/src/details/details.html?id=${post._id}`;
    });

    const plainContent = stripHtml(post.content); // 태그 지우기
    articleBox.innerHTML = `
      <p class="writing-topic">${post.type}</p>
      <h1 class="writing-title">${post.title}</h1>
      <p class="writing-content">${plainContent}</p>
    `;
    container.appendChild(articleBox);
  });
}

// 5. 로그인 체크 구독 버튼
function addEventListeners() {
  const subscribeButton = document.querySelector('.profile-btn button') as HTMLButtonElement;
  const subscriberEl = document.querySelector('.subscriber-number') as HTMLParagraphElement;

  if (subscribeButton) {
    subscribeButton.addEventListener('click', () => {
      const token = sessionStorage.getItem('accessToken');
      // 로그 아웃이면
      if (!token) {
        window.location.href = '/src/user/login/login.html';
        return;
      }

      // 로그인이면
      let currentCount = parseInt(subscriberEl.textContent || '0', 10);
      const isSubscribed = subscribeButton.textContent === '✓ 구독중';

      if (isSubscribed) {
        // [구독 취소]
        subscribeButton.textContent = '구독하기';
        subscribeButton.classList.remove('active');
        if (subscriberEl) subscriberEl.textContent = String(Math.max(0, currentCount - 1));
      } else {
        // [구독 시작]
        subscribeButton.textContent = '✓ 구독중';
        subscribeButton.classList.add('active');
        if (subscriberEl) subscriberEl.textContent = String(currentCount + 1);
      }
    });
  }
}

// 6. 메인 실행 코드
document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const _id = params.get('id');

  if (!_id) return;

  try {
    const [userResponse, postsResponse] = await Promise.all([axiosInstance.get(`/users/${_id}`), axiosInstance.get(`/posts/users/${_id}`)]);

    const rawUserData = userResponse.data.item;
    const postList = postsResponse.data.item;

    console.log('유저 정보(원본):', rawUserData);
    console.log('게시글 목록:', postList);

    if (rawUserData) {
      // 데이터 매핑
      const profileData: WriterProfile = {
        _id: rawUserData._id,
        name: rawUserData.name,
        image: rawUserData.image,
        job: rawUserData.extra?.job || '직업 없음',
        bookmarkedBy: rawUserData.bookmarkedBy?.users || 0,
        bookmark: rawUserData.bookmark?.users || 0,
        isSubscribed: false,
      };

      renderProfile(profileData);
    }

    if (postList) {
      renderPosts(postList);
    }

    addEventListeners();
  } catch (error) {
    console.error('데이터를 불러오는 중 에러가 발생했습니다:', error);
  }
});
