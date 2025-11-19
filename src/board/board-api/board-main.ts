import { getAxios } from '../../utils/axios';
import type { fileUpload, PostWrite } from './board-types';

const axiosInstance = getAxios();

/**
 * 파일 업로드
 * @param filesArray 업로드할 파일 배열
 */
let uploadFiles: File[] = [];
/**
 * 파일 업로드 함수
 * @param filesArray 업로드할 File 배열
 * @returns 업로드 결과 { ok: number, item: fileUpload[] }
 */
export async function uploadFile(filesArray: File[]) {
  const file = Array.from(filesArray); // 중복 변수명 제거

  if (!filesArray || filesArray.length === 0) {
    return { ok: 0, item: [] };
  }
  const imgFormData = new FormData();
  filesArray.forEach((file) => {
    imgFormData.append('attach', file);
  });
  try {
    // 콘솔로그:  FormData 내용 확인
    for (const pair of imgFormData.entries()) {
    }
    const { data } = await axiosInstance.post<fileUpload[]>('/files', imgFormData, { headers: { 'Content-Type': 'multipart/form-data' } });
    return { ok: 1, item: data };
  } catch (error) {
    console.log('error 발생', error);
    return { ok: 0, item: [] };
  }
}

/**
 * 게시글 생성 함수
 * @param title 게시글 제목
 * @param content 게시글 내용
 * @param extra 추가 정보
 * @param files 첨부 파일 경로 배열
 * @returns 생성된 게시글 정보(PostWrite) 또는 undefined
 */
export async function createPost(title: string, content: string, extra: string, files: string[]): Promise<PostWrite | undefined> {
  console.log('==d=', title, content);
  try {
    const postData = {
      title,
      content,
      extra,
      files,
    };
    const { data } = await axiosInstance.post<PostWrite>(`/posts/`, postData);
    console.log('게시글 생성 결과:', data);
    return data;
  } catch (err) {
    console.log('글 생성 중 에러 발생', err);
  }
}
