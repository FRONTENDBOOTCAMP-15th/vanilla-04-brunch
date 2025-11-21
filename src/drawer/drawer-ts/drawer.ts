import { userBranch, authorList, interPost } from './../drawer-api/drawer-main';

(() => {
  const li = document.createElement('li');

  const init = () => {
    async function renderUserList() {
      const authors = await authorList();
      // map + Object.fromEntries 사용해서 단일 객체로 변환
      const result = Object.fromEntries(
        authors?.map((author) => {
          return [author.name, author.image];
        }) || []
      );

      const writerList = document.querySelector('.writer-list') as HTMLUListElement;

      if (writerList && result) {
        writerList.innerHTML = ''; //  초기화

        for (const name in result) {
          // console.log(name);
          const image = result[name];

          // li 생성
          const li = document.createElement('li');
          li.classList.add('writer-item');

          // img 생성
          const img = document.createElement('img');
          img.src = image || '';
          img.alt = name;

          // span 생성 (작가 이름)
          const span = document.createElement('span');
          span.textContent = name;

          // li에 img + span 추가
          li.appendChild(img);
          li.appendChild(span);

          // li 클릭 시 페이지 이동
          li.style.cursor = 'pointer'; // 클릭 가능 표시
          li.addEventListener('click', () => {
            window.location.href = '/src/writer-home/writer-home.html';
          });

          // ul에 li 추가
          writerList.appendChild(li);
        }
      }
    }

    renderUserList();
  };
  // 관심글
  async function favPost() {
    const postIneter = await interPost();

    const goodPost = postIneter?.map((Post) => {
      return {
        title: Post.title,
        author: Post.author,
        // postImage: Post.image,
      };
    });
    console.log('goodPost', goodPost);

    const interest = document.querySelector('.recent-list') as HTMLUListElement;
    li.classList.add('post');
    interest.appendChild(li);

    //   const img = document.createElement('img');
    //   img.src = image || '';
    //   img.alt = name;
    // }
  }

  //
  favPost();
  // 여기까지
  //내 브런치
  async function loadWriter() {
    const posts = await userBranch();
    // console.log('posts', posts);
    const meBranch = posts?.map((posts) => {
      return {
        title: posts.title,
        subTitle: posts.subTitle,
        writeId: posts.id,
      };
    });

    loadWriter();

    const writerBranch = document.querySelector('.content-total') as HTMLUListElement;

    if (writerBranch && meBranch) {
      writerBranch.innerHTML = ''; //  초기화

      for (const total of meBranch) {
        const writeTitle = total.title;
        const subTitle = total.subTitle;
        const id = total.writeId;

        const li = document.createElement('li');
        li.classList.add('content');

        const h3 = document.createElement('h3');
        h3.textContent = writeTitle;

        const p = document.createElement('p');
        p.textContent = subTitle;

        li.appendChild(h3);
        li.appendChild(p);

        writerBranch.appendChild(li);
        // li 클릭 시 페이지 이동

        li.style.cursor = 'pointer'; // 클릭 가능 표시
        li.addEventListener('click', () => {
          window.location.href = `/src/details/details.html?id=${id}`;
        });
      }
    }
  }
  loadWriter();
  window.addEventListener('DOMContentLoaded', init);
})();
