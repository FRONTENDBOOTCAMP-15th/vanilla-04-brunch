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
  replies: [
    {
      content: string;
      user: {
        _id: number;
        name: string;
        image: string;
      };
    },
  ];
}
