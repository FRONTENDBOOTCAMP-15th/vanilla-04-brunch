import { getAxios } from '../../utils/axios';
import type { PostWrite } from './board-types';

const axiosInstance = getAxios();

export async function uploadFile(input: HTMLInputElement) {
  const files = input.files;

  if (!files || files.length === 0) {
    return [];
  }
  console.log(files);
  //
  try {
  } catch (error) {
    console.log(error);
  }
}

export async function createPost(title: string, content: string, postContent: string) {
  console.log('==d=', title, content, postContent);
  try {
    // const type = 'posts';
    const postData = {
      title,
      content,
      postContent,
    };
    const { data } = await axiosInstance.post<PostWrite>(`/posts/`, postData);
    console.log(data);
  } catch (err) {
    console.log('--에러테스트', err);
  }
}
