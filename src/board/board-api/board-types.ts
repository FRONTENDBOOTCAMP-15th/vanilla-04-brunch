/**
 * PostWrite
 * 글 작성 시 사용하는 타입
 * **/
export interface PostWrite {
  ok: number;
  item: {
    _id: number;
    title: string;
    content: string;
    extra: string;
    files: string[];
  };
}
/**
 * fileUpload
 * 업로드된 파일 정보를 보여주는곳
 */
export interface fileUpload {
  name: string;
  path: string;
}
/**
 * UploadResponse 인터페이스
 * 파일 업로드 API 응답
 */
export interface UploadResponse {
  ok: number;
  item: fileUpload[];
}
/**
 * FileInfo 인터페이스
 * 파일 메타데이터 정보
 */
export interface FileInfo {
  name: string;
  size: number;
  type: string;
}
