// /**
//  *
//  * 1. 북마크 전체 정보
//  *
//  */

// export interface BookMarkInfo {
//   _id: number;
//   type: string;
//   user_id: number;
//   target_id: number;
//   user: object;
//   memo: string;
//   createdAt: string;
//   updatedAt: string;
// }
// /**
//  *
//  * 2. 최근 본글
//  *
//  */
// export interface RecentStory {
//   postId: number; // rm
//   title: string;
//   recent: string;
// }
// /**
//  *
//  * 3. 관심글 정보 GET /users/{_id}/bookmarks (post)
//  *
//  */

// /**
//  * 4.내가 쓴 post 정보
//  */
// // export interface PostInfo {
// //   _id: number;
// //   type: string;
// //   title: string;
// //   extra: object;
// //   views: number;
// //   user: object;
// //   content: string;
// //   replies: ReplyInfo[];
// //   createdAt: Date;
// //   updateAt: Date;
// // }
// export interface PostInfo {
//   _id: number;
//   type: string;
//   title: string;
//   // extra: PostExtra;
//   // user: UserInfo;
// }
// export interface PostExtra {
//   subTitle?: string;
//   image?: string; // 책 이미지
// }

// export interface ReplyInfo {
//   content: string;
// }
// /**
//  * API 에러 응답
//  */
// export interface ApiError {
//   ok: 0;
//   message: string;
// }
// /**
//  * BookMarkInfo 사용자의 모든 북마크 목록  조회 응답 /users/{_id}/bookmarks
//  * 성공: { ok: 1, items: [...] }
//  * 실패: { ok: 0, message: "에러 메시지" }
//  */
// export type bookmarkinfoRes = {
//   ok: 1;
//   item: {
//     // byUser: BookMarkInfo[];
//     post: PostInfo[];
//     // user: BookMarkInfo[]; // 관심 작가 목록
//   };
// };
//관심 작가 정보 타입
export interface UserInfo {
  _id: number;
  name: string;
  image: string;
}

export interface BookmarkUser {
  _id: number; // 북마크 ID
  user: UserInfo; // 관심작가 정보
  createdAt: string;
}

//  BookMarkInfo 사용자의 모든 북마크 목록  조회 응답 /users/{_id}/bookmarks
export interface bookmarkinfoRes {
  ok: number;
  item: {
    user: BookmarkUser[];
  };
}

export interface userPost {
  _id: number;
  title: string;
  extra?: { subTitle?: string };
  image?: string;
  user?: User;
  createdAt: string;
}
interface User {
  _id: number;
  name: string;
  image?: string;
}
export interface UserPostResponse {
  ok: number;
  item: userPost[]; // item은 userPost 배열
  // pagination: {
  //   // page: number;
  //   // limit: number;
  //   // total: number;
  //   // totalPages: number;
  // };
}
export interface bookmarkInter {
  _id: number;
  user_id: number;
  image?: string;
  createdAt: string;
  post: {
    _id: number;
    type: string;
    title: string;
    user: {
      _id: number;
      name: string;
    };
    image?: string;
  };
}
export interface BookmarkInterRes {
  ok: number;
  item: bookmarkInter[];
}
