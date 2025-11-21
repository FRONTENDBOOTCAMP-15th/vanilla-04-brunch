export interface postInfo {
  title: string;
  content: string;
  user: {
    _id: number;
    name: string;
  };
  image: string | string[];
  createdAt: string;
}
