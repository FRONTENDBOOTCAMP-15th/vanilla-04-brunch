// import type { FileInfo } from '../board-api/board-types';

import type { fileUpload, UploadResponse } from '../board-api/board-types';
import { createPost, uploadFile } from './../board-api/board-main';
let filesArray: File[] = [];
let filePaths: string[] = [];
(() => {
  function titleWrite(value: string) {}
  function subTitle(value: string) {}
  function contentWrite(value: string) {}

  const inputTitle = document.querySelector('#title') as HTMLInputElement;
  const inputSubTitle = document.querySelector('#subtitle') as HTMLInputElement;
  const inputContent = document.querySelector('#content') as HTMLInputElement;
  const button = document.getElementById('save') as HTMLButtonElement;
  const fileUpload = document.querySelector('#btnFileUpload') as HTMLButtonElement;
  const inputFile = document.querySelector('input[type="file"]') as HTMLInputElement;
  const previewFile = document.getElementById('previewContainer') as HTMLElement;

  const init = () => {
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

    if (button) {
      button.addEventListener('click', async () => {
        try {
          const fileUploadResult = inputFile.files;

          if (fileUploadResult) {
            const newSelectedFiles = Array.from(fileUploadResult);
            filesArray = filesArray.concat(newSelectedFiles);

            const response: UploadResponse = await uploadFile(filesArray); // Axios 반환값
            const uploadedFiles: fileUpload[] = response.item ?? [];
            console.log('=d', uploadedFiles);
            filePaths = uploadedFiles.map((file) => file.path);

            console.log('최종 path 배열:', filePaths);

            console.log('파일 추출 하는곳', filesArray);
          }

          // 2. 글쓰기 값 가져오기
          const postTitle = inputTitle.value;
          const postSubTitle = inputSubTitle.value;
          const postContent = inputContent.value;

          // 3. 글 + 파일경로 함께 서버 전송
          const writeResult = createPost(postTitle, postSubTitle, postContent, filePaths);
        } catch (error) {
          console.error('저장 중 오류:', error);
        }
      });
    }

    fileUpload.addEventListener('click', () => {
      inputFile.click();
    });

    // let filesArray: File[] = [];

    inputFile.addEventListener('change', () => {
      const fileList = inputFile.files;
      console.log('fileList', fileList);
      if (fileList) {
        const newlySelectedFiles = Array.from(fileList);
        filesArray = filesArray.concat(newlySelectedFiles);
        viewFile(filesArray);
      }
    });

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
