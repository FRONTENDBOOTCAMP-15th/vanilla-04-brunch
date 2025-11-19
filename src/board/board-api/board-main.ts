import { getAxios } from '../../utils/axios';
import type { fileUpload, PostWrite, UploadResponse } from './board-types';

const axiosInstance = getAxios();

/**
 * 파일 업로드할 파일 배열
 */
let uploadFiles: File[] = [];

/**
 * 파일 업로드 함수
 * @param filesArray 업로드할 File 배열
 * @returns 업로드 결과 { ok: number, item: fileUpload[] }
 */
export async function uploadFile(filesArray: File[]): Promise<UploadResponse> {
  if (!filesArray || filesArray.length === 0) {
    return { ok: 0, item: [] };
  }

  const formData = new FormData();
  filesArray.forEach((file) => {
    formData.append('attach', file);
  });

  try {
    // 서버에서 바로 fileUpload[] 배열 반환
    const { data } = await axiosInstance.post<fileUpload[]>('/files', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return { ok: 1, item: data }; // wrapper 없이 바로 배열
  } catch (error) {
    console.error('파일 업로드 중 오류 발생:', error);
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
export async function createPost(title: string, content: string, extra: string, firstResponse: string[]): Promise<PostWrite | undefined> {
  console.log('게시글 생성 데이터:', title, content, extra, firstResponse);

  try {
    const postData = {
      title,
      content,
      extra,
      image: firstResponse, // 서버에 보내는 첨부파일 경로 배열
    };

    const { data } = await axiosInstance.post<PostWrite>('/posts/', postData);
    console.log('게시글 생성 결과:', data);

    return data;
  } catch (err) {
    console.error('글 생성 중 오류 발생:', err);
  }
}
