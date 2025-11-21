import { getAxios } from '../../utils/axios';
import type { bookmarkinfoRes, bookmarkInter, BookmarkInterRes, UserPostResponse } from './drawer-types';

const axiosInstance = getAxios();

//  관심 작가  조회 하기
//async 는 비동기 방식으로 기다리지 않고 뿌려주기
export async function authorList() {
  try {
    // const type = 'bookmarks';
    const token = sessionStorage.getItem('accessToken');
    const userId = sessionStorage.getItem('user-id');

    if (!token) {
      console.error('로그인이 안되어 있어 로그인화면으로 가세요');
      alert('로그인해주세요');
      window.location.href = '../user/login/login.html';
      return []; // 빈 배열로 반환! (string 반환 X)
    }

    const { data } = await axiosInstance.get<bookmarkinfoRes>(`/users/${userId}/bookmarks`);

    if (data.ok) {
      const authors = data.item.user ?? [];

      const result = authors.map((author) => {
        // console.log('==map 안에서 배열을 순회중', author);
        return {
          name: author.user.name,
          image: author.user.image,
        };
      });

      return result;
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
//3. 관심글

export async function interPost() {
  try {
    console.log('hidddddddddd');
    const mark = await axiosInstance.get<BookmarkInterRes>(`/bookmarks/post/`);
    const likeBook = mark.data.item;
    console.log(' dd', likeBook);

    const iterBook = likeBook.map((book) => {
      console.log(book);
      return {
        postId: book.post._id,
        title: book.post.title,
        author: book.post.user.name,
        postImage: book.post.image,
      };
    });

    console.log('iterBook', iterBook);

    return iterBook;
  } catch (error) {
    console.error('에러입니다');
  }
}

//4. 내 브런치
export async function userBranch() {
  try {
    const myid = sessionStorage.getItem('user-id');
    if (!myid) {
      console.warn('user-id가 없습니다.');
      return;
    }

    const mybrunch = await axiosInstance.get<UserPostResponse>(`/posts/users/${myid}`);
    const brunchPost = mybrunch.data;

    const postBrunchs = brunchPost.item.map((post) => {
      return {
        id: post._id,

        title: post.title,
        subTitle: post.extra?.subTitle ?? '',
      };
    });

    return postBrunchs;
  } catch (error) {
    console.log(error);
  }
}
interPost();
authorList();
userList();
userBranch();
