import { getAxios } from '../../utils/axios';
import type { fileUpload, PostWrite } from './board-types';

const axiosInstance = getAxios();

/**
 * 파일 업로드
 * @param filesArray 업로드할 File 배열
 */ let uploadFiles: File[] = [];

export async function uploadFile(filesArray: File[]) {
  console.log('==보내기==', filesArray);

  const file = Array.from(filesArray); // 중복 변수명 제거
  console.log('==에러일까==', file);

  if (!filesArray || filesArray.length === 0) {
    return [];
  }
  const imgFormData = new FormData();
  filesArray.forEach((file) => {
    imgFormData.append('attach', file);
  });
  try {
    console.log('==시도');
    // imgFormData.append('attach', JSON.stringify(file));
    console.log('==append 가 잘안되니?', imgFormData);
    for (const pair of imgFormData.entries()) {
      console.log('==append 가 잘안되니?2', pair[0], pair[1]);
    }
    const { data } = await axiosInstance.post<fileUpload[]>('/files', imgFormData, { headers: { 'Content-Type': 'multipart/form-data' } });
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
//, image: string[]
export async function createPost(title: string, content: string, extra: string, filePaths: string[]) {
  console.log('==d=', title, content);
  console.log('path 호출', filePaths);
  try {
    // const type = 'posts';

    const postData = {
      title,
      content,
      extra,
      image: filePaths,
      // image: uploadResult.path,
    };
    const { data } = await axiosInstance.post<PostWrite>(`/posts/`, postData);
    console.log(data);
  } catch (err) {
    console.log('--에러테스트', err);
  }
}
