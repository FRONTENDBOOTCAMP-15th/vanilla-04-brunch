import { getAxios } from '../../utils/axios';
import type { bookmarkinfoRes } from './drawer-types';

const axiosInstance = getAxios();

// 1.PostInfo 관심작가 -- post 에서 가져오기 관심 작가 가져오기

//  관심 작가  조회 하기
//async 는 비동기 방식으로 기다리지 않고 뿌려주기
async function postList() {
  try {
    // const type = 'bookmarks';
    const token = sessionStorage.getItem('accessToken');
    console.log('accessToken-id', token);

    if (!token) {
      console.error('로그인이 안되어 있어 로그인화면으로 가세요');
      alert('로그인해주세요');
      return (window.location.href = `/src/sign-up/login.html`);
    }

    // const { data } = await axiosInstance.get<bookmarkinfoRes>(`/users/${_id}/${type}`);
    const { data } = await axiosInstance.get<bookmarkinfoRes>(`/users/{_id}/bookmarks`);
    // const userId = userToken.data.item._id;
    const userId2 = data;

    console.log(userId2);
    // const { data } = await axiosInstance.get<bookmarkinfoRes>(`/users/{_id}/bookmarks`);
    if (data.ok) {
      console.log(data.ok);

      console.log('북마크 목록:', data);
    }
  } catch (err) {
    console.error(err);
  }
}
async function userList() {
  try {
    const type = 'user';

    const { data } = await axiosInstance.get<bookmarkinfoRes>(`/bookmarks/${type}`);
    if (data.ok) {
    }
  } catch (err) {
    console.error(err);
  }
}
/**
 *  2. LocalStorage에 최근 본 글 추가 최근 본 글
 *
 */

// function StoryView(view: RecentStory) {
//   const key = 'RecentStory';
//   // 1. LocalStorage에서 기존 데이터 가져오기
//   // 값이 있으면 배열로 변환, 없으면 빈 배열
//   const result = localStorage.getItem(key);
//   const current: RecentStory[] = result ? JSON.parse(result) : [];
//   console.log(current);
//   // 2. 중복 제거: 이미 있으면 삭제
//   for (let i = 0; i < current.length; i++) {
//     if (current[i].postId === view.postId) {
//       current.splice(i, 1);
//       break; // 하나만 제거
//     }
//   }
// }
// 3. 새 글 맨 앞에 추가

//4.  제한 없이 저장

postList();
userList();
// StoryView();
