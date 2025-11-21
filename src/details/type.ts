export interface PostInfo {
  _id: number;
  bookmarks: string;
  type: string;
  title: string;
  extra: {
    subTitle: string;
  };
  image: string[];
  content: string;
  user: {
    _id: number;
    name: string;
    image: string;
  };
  likes: number;
  createdAt: string;
  updatedAt: string;
  replies?: {
    content: string;
    user: {
      _id: number;
      name: string;
      image: string;
    };
  }[];
}

export interface PostAuthorInfo {
  _id: number;
  name: string;
  image: string;
  extra?: {
    job?: string;
    biography?: string;
  };
  bookmarkedBy: {
    users: number;
  };
}

export type AuthorInfoBookmarkedBy = Pick<PostAuthorInfo, 'bookmarkedBy'>;

export interface BookmarkPostInfo {
  post: {
    post: {
      _id: number;
    };
  }[];
  user: {
    _id: number;
    user_id: number;
    user: {
      email: string;
      extra: {
        biography: string;
        job: string;
        keyword: string[];
      };
      image: string;
      name: string;
      type: string;
      _id: number;
    };
  }[];
}
