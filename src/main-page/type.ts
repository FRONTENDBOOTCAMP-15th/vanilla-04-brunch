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
