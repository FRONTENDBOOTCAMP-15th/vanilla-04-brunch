export interface Posts {
  _id: number;
  title: string;
  content: string;
  extra: string;
  image: string;
  user: {
    _id: number;
    type: string;
    name: string;
    email: string;
  };
}

export interface Users {
  _id: number;
  email: string;
  name: string;
  type: string;
  image: string;
  extra: {
    job: string;
    biography: string;
    keyword: string;
  };
  bookmarkedBy: {
    users: number;
  };
}
