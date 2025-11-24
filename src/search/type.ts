export interface postInfo {
  _id: string;
  title: string;
  content: string;
  user: {
    _id: number;
    name: string;
  };
  image: string | string[];
  createdAt: string;
}

export interface authorInfo {
  _id: string;
  name: string;
  extra?: {
    biography?: string;
    job?: string;
    keyword?: string[];
  };
  image: string | string[];
}
