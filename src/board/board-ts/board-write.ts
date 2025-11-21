import type { fileUpload, UploadResponse } from '../board-api/board-types';
import { createPost, uploadFile } from './../board-api/board-main';

/**
 * 업로드할 파일 객체 배열
 */
let filesArray: File[] = [];

/**
 * 서버에서 반환받은 업로드 파일 경로 배열
 */

(() => {
  function titleWrite(value: string) {
    if (inputTitle) inputTitle.value = value;
  }
  function subTitle(value: string) {
    if (inputSubTitle) inputSubTitle.value = value;
  }
  function contentWrite(value: string) {
    if (inputContent) inputContent.value = value;
  }

  // DOM 요소 선택
  const inputTitle = document.querySelector('#title') as HTMLInputElement;
  const inputSubTitle = document.querySelector('#subtitle') as HTMLInputElement;
  const inputContent = document.querySelector('#content') as HTMLInputElement;
  const button = document.getElementById('save') as HTMLButtonElement;
  const fileUpload = document.querySelector('#btnFileUpload') as HTMLButtonElement;
  const inputFile = document.querySelector('input[type="file"]') as HTMLInputElement;
  const previewFile = document.getElementById('previewContainer') as HTMLElement;

  const init = () => {
    // 글 입력
    inputTitle.addEventListener('keyup', (event: Event) => {
      const target = event.target as HTMLInputElement;
      titleWrite(target.value);
    });

    inputSubTitle.addEventListener('keyup', (event: Event) => {
      const subTarget = event.target as HTMLInputElement;
      subTitle(subTarget.value);
    });

    inputContent.addEventListener('keyup', (event: Event) => {
      const contentTarget = event.target as HTMLInputElement;
      contentWrite(contentTarget.value);
    });
    // 저장 버튼 클릭 이벤트
    if (button) {
      button.addEventListener('click', async () => {
        try {
          const fileUploadResult = inputFile.files;
          let uploadedFilePaths: string[] = [];
          if (fileUploadResult) {
            // 서버에 파일 업로드
            const response: UploadResponse = await uploadFile(filesArray); // Axios 반환값
            const uploadedFiles: fileUpload[] = ([] as fileUpload[]).concat(response.item ?? []);
            console.log('==uploadedFiles', uploadedFiles);
            const finish = uploadedFiles[0].item;

            uploadedFilePaths = finish?.map((data) => {
              console.log(data);
              return data.path;
            });
          }
          // 2. 글쓰기 값 가져오기
          const postTitle = inputTitle.value;
          const postSubTitle = inputSubTitle.value;
          const postContent = inputContent.value;

          // 3. 글 + 파일경로 함께 서버 전송
          const writeResult = await createPost(postTitle, postSubTitle, postContent, uploadedFilePaths);

          // 서버에서 받은 새 글 ID
          if (writeResult) {
            const newPostId = writeResult.item._id;
            // 상세페이지로 이동
            window.location.href = `/src/details/details.html?id=${newPostId}`;
          }
        } catch (error) {
          console.error('저장 중 오류:', error);
        }
      });
    }
    // 파일 선택창 열기
    fileUpload.addEventListener('click', () => {
      inputFile.click();
    });
    // 파일 선택 시 미리보기 및 배열에 저장
    inputFile.addEventListener('change', () => {
      const fileList = inputFile.files;
      console.log('fileList', fileList);
      if (fileList) {
        const newlySelectedFiles = Array.from(fileList);
        filesArray = filesArray.concat(newlySelectedFiles);
        viewFile(filesArray);
      }
    });
    /**
     * 선택한 파일 미리보기 함수
     * @param filesArray 미리보기할 파일 배열
     */
    function viewFile(filesArray: File[]) {
      const result = filesArray.map((file) => {
        const imgURL = URL.createObjectURL(file);
        return `<img src="${imgURL}" />`;
      });

      if (previewFile) {
        previewFile.innerHTML = result.join('');
      }
    }
  };

  window.addEventListener('DOMContentLoaded', init);
})();
