import { createPost } from './../board-api/board-main';
(() => {
  //
  function titleWrite(value: string) {}
  function subTitle(value: string) {}
  function contentWrite(value: string) {}

  const inputTitle = document.querySelector('#title') as HTMLInputElement;
  const inputSubTitle = document.querySelector('#subtitle') as HTMLInputElement;
  const inputContent = document.querySelector('#content') as HTMLInputElement;
  const button = document.getElementById('save') as HTMLButtonElement;
  const inputFile = document.querySelector('input[type="file"]') as HTMLInputElement;
  const previewFile = document.getElementById('previewContainer') as HTMLElement;

  //2.초기화 함수 ( 화면이 로드되면, 시행)
  const init = () => {
    inputTitle.addEventListener('keyup', (event: Event) => {
      const target = event.target as HTMLInputElement;
      titleWrite(target.value);
    }); // keyup 이벤트 등록
    //
    inputSubTitle.addEventListener('keyup', (event: Event) => {
      const subTarget = event.target as HTMLInputElement;

      subTitle(subTarget.value);
    });
    //
    inputContent.addEventListener('keyup', (event: Event) => {
      const contentTarget = event.target as HTMLInputElement;

      contentWrite(contentTarget.value);
    });
    //여긴 save 저장 클릭시  시작되는곳
    if (button) {
      button.addEventListener('click', async () => {
        try {
          //1. 파일 먼저 업로드
          const postTitle = inputTitle.value;
          const postSubTitle = inputSubTitle.value;
          const postContent = inputContent.value;
          const fileList = inputFile.files;
          const writeResult = createPost(postTitle, postSubTitle, postContent);
          //2.업로드 끝난 후 나머지 데이터 저장
        } catch (error) {
          console.error('저장 중 오류:', error);
        }
      });
    }

    inputFile.addEventListener('change', (event) => {
      const fileList = inputFile.files;
      console.log('fileList', fileList);

      if (fileList) {
        const filesArray = Array.from(fileList);

        viewFile(filesArray);
      }
    });
    function viewFile(filesArray: File[]) {
      const result = filesArray.map((file) => {
        const imgURL = URL.createObjectURL(file);
        return `
          <img src="${imgURL}" />
        `;
      });

      if (previewFile) {
        previewFile.innerHTML = result.join('');
      }
    }
  };

  //1.화면이 로드되면 init을 실행
  window.addEventListener('DOMContentLoaded', init);
})();
