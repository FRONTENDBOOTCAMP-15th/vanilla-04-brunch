/**
 * PostWrite 글쓰기 타입
 * **/
export interface PostWrite {
  type: string;
  title: string;
  content: string;
  image: string[];
  tag: string;
}
export interface fileUpload {
  attach: Array<string>;
}
export interface FileInfo {
  name: string;
  size: number;
  type: string;
}
