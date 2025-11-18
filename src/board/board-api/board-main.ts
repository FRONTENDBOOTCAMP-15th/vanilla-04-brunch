import { getAxios } from '../../utils/axios';
import type { fileUpload, PostWrite } from './board-types';

const axiosInstance = getAxios();

/**
 * 파일 업로드
 * @param filesArray 업로드할 File 배열
 */ let uploadFiles: File[] = [];

export async function uploadFile(filesArray: object[]) {
  console.log('==보내기==', filesArray);

  const files = Array.from(filesArray); // 중복 변수명 제거
  console.log('==에러일까==', files);

  if (!filesArray || filesArray.length === 0) {
    return [];
  }

  try {
    const { data } = await axiosInstance.post<fileUpload>(`/files/`, filesArray);
    return data;
  } catch (error) {
    console.log(error);
    return [];
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
