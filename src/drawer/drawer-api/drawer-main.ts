import { getAxios } from '../../utils/axios';
import type { bookmarkinfoRes, BookmarkInterRes, UserPostResponse } from './drawer-types';

const axiosInstance = getAxios();

//  관심 작가  조회 하기
//async 는 비동기 방식으로 기다리지 않고 뿌려주기
export async function authorList() {
  try {
    // const type = 'bookmarks';
    // const token = sessionStorage.getItem('accessToken');
    const userId = sessionStorage.getItem('user-id');

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

export async function interPost() {
  try {
    const mark = await axiosInstance.get<BookmarkInterRes>(`/bookmarks/post/`);
    const likeBook = mark.data.item;
    const iterBook = likeBook.map((book) => ({
      postId: book.post._id,
      title: book.post.title,
      author: book.post.user.name,
      postImage: book.post.image === undefined ? '/src/drawer/drawer-img/book.img.png' : book.post.image,
    }));

    return iterBook;
  } catch (error) {
    console.error('interPost 에러:', error);
    return [];
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
