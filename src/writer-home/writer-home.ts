import { getAxios } from '../utils/axios';

// 게시글 데이터 인터페이스
export interface PostInfo {
  _id: number;
  type: string; // 기존 topic
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

// 프로필 데이터 인터페이스
export interface WriterProfile {
  _id: number;
  name: string;
  job: string;
  subscribers: number;
  following: number;
  profileImageUrl: string;
  isSubscribed: boolean;
}

// 2. 목업데이터

const mockProfileData: WriterProfile = {
  _id: 2,
  name: 'AB',
  job: '기획자',
  subscribers: 30,
  following: 16,
  profileImageUrl: '/images/ab-profile.png',
  isSubscribed: true,
};

const mockPostList: PostInfo[] = [
  {
    _id: 101,
    type: '취준은 처음이라',
    title: '[취업특강] 노션 포트폴리오 만들기',
    extra: { subTitle: '부제 없음' },
    image: '',
    content: 'with 노슈니,슈크림 마을, 마포청년나루 | ...',
    user: {
      _id: 2,
      name: 'AB',
      image: '/images/ab-profile.png',
    },
    likes: 10,
    createdAt: 'Jul 02. 2024',
    updatedAt: 'Jul 02. 2024',
  },
  {
    _id: 102,
    type: '일상 기록',
    title: '두 번째 글입니다',
    extra: { subTitle: '부제 테스트' },
    image: '',
    content: '이것은 두 번째 글의 내용입니다...',
    user: {
      _id: 2,
      name: 'AB',
      image: '/images/ab-profile.png',
    },
    likes: 5,
    createdAt: 'Jul 05. 2024',
    updatedAt: 'Jul 05. 2024',
  },
];
const axiosInstance = getAxios();

// 프로필 정보
function renderProfile(profile: WriterProfile) {
  const nameEl = document.querySelector('.profile-name') as HTMLParagraphElement;
  const jobEl = document.querySelector('.profile-job') as HTMLParagraphElement;
  const subscriberEl = document.querySelector('.subscriber-number') as HTMLParagraphElement;
  const interestEl = document.querySelector('.interest-number') as HTMLParagraphElement;
  const imageEl = document.querySelector('.profile-image') as HTMLImageElement;
  const buttonEl = document.querySelector('.profile-btn button') as HTMLButtonElement;

  if (nameEl) nameEl.textContent = profile.name;
  if (jobEl) jobEl.textContent = profile.job;
  if (subscriberEl) subscriberEl.textContent = String(profile.subscribers);
  if (interestEl) interestEl.textContent = String(profile.following);
  if (imageEl) imageEl.src = profile.profileImageUrl;
  if (buttonEl) {
    buttonEl.textContent = profile.isSubscribed ? '✓ 구독중' : '구독하기';
  }
}

//글 목록
function renderPosts(posts: PostInfo[]) {
  const container = document.querySelector('.writer-container');
  if (!container) return;

  // 기존 글 상자 지우기
  document.querySelectorAll('.writing-box').forEach((box) => box.remove());

  posts.forEach((post) => {
    const articleBox = document.createElement('div');
    articleBox.className = 'writing-box';

    // 클릭 가능
    articleBox.style.cursor = 'pointer';

    // 클릭 이벤트 추가
    articleBox.addEventListener('click', () => {
      // 상세 페이지로 이동 (예: /article/게시글ID)
      window.location.href = `/article/${post._id}`;
    });

    articleBox.innerHTML = `
      <p class="writing-topic">${post.type}</p>
      <h1 class="writing-title">${post.title}</h1>
      <p class="writing-content">${post.content}</p>
      `;
    container.appendChild(articleBox);
  });
}
// 이벤트 처리
function addEventListeners() {
  const subscribeButton = document.querySelector('.profile-btn button');

  if (subscribeButton) {
    subscribeButton.addEventListener('click', () => {
      const currentText = subscribeButton.textContent;
      if (currentText === '✓ 구독중') {
        subscribeButton.textContent = '구독하기';
        console.log('구독 취소 API 호출 필요');
      } else {
        subscribeButton.textContent = '✓ 구독중';
        console.log('구독 시작 API 호출 필요');
      }
    });
  }
}

// 5. 코드 실행

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  // id가 없으면 기본값 '2' (테스트용)
  const _id = params.get('id');

  try {
    // 2. API 호출 (프로필 정보와 게시글 목록을 동시에 요청)
    // axiosInstance.get은 Promise를 반환하므로 await로 기다려야 합니다.
    const [userResponse, postsResponse] = await Promise.all([
      axiosInstance.get(`/users/${_id}`), // 작가 프로필 정보 요청
      axiosInstance.get(`/posts/users/${_id}`), // 작가가 쓴 게시글 목록 요청
    ]);

    const userData = userResponse.data.item;
    const postList = postsResponse.data.item;

    console.log('유저 정보:', userData);
    console.log('게시글 목록:', postList);

    // 프로필 렌더링 목업 데이터 제거
    if (userData) {
      renderProfile(userData);
    }

    // 게시글 목록 렌더링 목업 데이터 제거
    if (postList) {
      renderPosts(postList);
    }

    // 6. 이벤트 리스너 등록
    addEventListeners();
  } catch (error) {
    console.error('데이터를 불러오는 중 에러가 발생했습니다:', error);
    // 목업 데이터
    // renderProfile(mockProfileData);
    // renderPosts(mockPostList);
  }
});
