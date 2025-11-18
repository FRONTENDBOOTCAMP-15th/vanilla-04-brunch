// import type { FileInfo } from '../board-api/board-types';
import { createPost, uploadFile } from './../board-api/board-main';

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
          let fileUploadResult = inputFile.files;
          if (fileUploadResult) {
            const newSelectedFiles = Array.from(fileUploadResult);
            filesArray = filesArray.concat(newSelectedFiles);
            const file = uploadFile(filesArray);
          }
          if (fileUploadResult?.length === 0 && fileUploadResult) {
            // const file = uploadFile(fileUploadResult);
          }

          const postTitle = inputTitle.value;
          const postSubTitle = inputSubTitle.value;
          const postContent = inputContent.value;
          const writeResult = createPost(postTitle, postSubTitle, postContent);
        } catch (error) {
          console.error('저장 중 오류:', error);
        }
      });
    }

    fileUpload.addEventListener('click', () => {
      inputFile.click();
    });

    let filesArray: File[] = [];

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
