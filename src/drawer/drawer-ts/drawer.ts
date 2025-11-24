import { userBranch, authorList, interPost } from './../drawer-api/drawer-main';

(() => {
  // 페이지 로드 후 실행
  const init = () => {
    renderUserList();
    favPost();
    recentPost();
    loadWriter();
  };

  // 관심 작가
  async function renderUserList() {
    const token = sessionStorage.getItem('accessToken');
    if (!token) {
      alert('로그인해주세요');
      window.location.href = '/src/user/login/login.html';
      return;
    }

    const authors = await authorList();

    // authors 배열이 없으면 빈 객체로
    const result = Object.fromEntries(authors?.map((author) => [author.name, author.image]) || []);

    const writerList = document.querySelector('.writer-list') as HTMLUListElement;

    if (!writerList) return;
    writerList.innerHTML = ''; // 초기화

    for (const name in result) {
      const image = result[name];

      const li = document.createElement('li');
      li.classList.add('writer-item');

      const img = document.createElement('img');
      img.src = image || '/src/drawer/drawer-img/book.img.png';
      img.alt = name;

      const span = document.createElement('span');
      span.textContent = name;

      li.appendChild(img);
      li.appendChild(span);

      li.style.cursor = 'pointer';
      li.addEventListener('click', () => {
        window.location.href = '/src/writer-home/writer-home.html';
      });

      writerList.appendChild(li);
    }
  }
  // 최근 본글
  async function recentPost() {
    const recentList = document.querySelector('.recent .recent-list') as HTMLUListElement;
    if (!recentList) {
      return;
    }
    // recentList.innerHTML = '';
    const postIds: number[] = JSON.parse(sessionStorage.getItem('postId') || '[]');
    const postTitles: string[] = JSON.parse(sessionStorage.getItem('postTitle') || '[]');
    const postAuthors: string[] = JSON.parse(sessionStorage.getItem('postAuthorName') || '[]');
    const postImgs: (string | string[])[] = JSON.parse(sessionStorage.getItem('postImg') || '[]');

    console.log(postTitles, postImgs, postAuthors, postIds);
  }
  // 관심 글'
  async function favPost() {
    const postInter = await interPost();

    console.log(postInter);
    const goodPost =
      postInter?.map((good) => ({
        id: good.postId,
        title: good.title,
        author: good.author,
        postImage: good.postImage,
      })) || [];

    const interest = document.querySelector('.favorite .recent-list') as HTMLUListElement;

    interest.innerHTML = ''; // 초기화

    goodPost.forEach((good) => {
      const li = document.createElement('li');
      li.classList.add('post');
      let imageUrl = '';
      li.dataset.id = String(good.id);
      //배열인 경우
      if (Array.isArray(good.postImage)) {
        imageUrl = good.postImage[0];
      } else {
        imageUrl = good.postImage;
      }

      li.innerHTML = `
        <div class="card">
          <img src="${imageUrl}" alt="${good.title}"  />
          <div class="white-box">
            <h3 class="title">${good.title}</h3>
            <p class="post-author">${good.author}</p>
          </div>
        </div>
          <div class="card-text">
      <p>${good.title}</p>
      <span>by ${good.author}</span>
    </div>
      `;

      interest.appendChild(li);
    });
    // 카드클릭시  해당 id 를 가져옴
    interest.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const li = target.closest('li.post') as HTMLLIElement;

      if (!li) {
        return;
      }

      const postId = li.dataset.id;
      console.log('선택한 postId:', postId);

      if (postId) {
        // id를 URL에 붙여서 상세페이지 이동
        window.location.href = `/src/details/details.html?id=${postId}`;
      }
    });
  }

  // 내 브런치
  async function loadWriter() {
    const posts = await userBranch();

    const meBranch =
      posts?.map((p) => ({
        title: p.title,
        subTitle: p.subTitle,
        writeId: p.id,
      })) || [];

    const writerBranch = document.querySelector('.content-total') as HTMLUListElement;
    if (!writerBranch) return;

    writerBranch.innerHTML = '';

    meBranch.forEach((total) => {
      const li = document.createElement('li');
      li.classList.add('content');

      const h3 = document.createElement('h3');
      h3.textContent = total.title;

      const p = document.createElement('p');
      p.textContent = total.subTitle;

      li.appendChild(h3);
      li.appendChild(p);

      li.style.cursor = 'pointer';
      li.addEventListener('click', () => {
        window.location.href = `/src/details/details.html?id=${total.writeId}`;
      });

      writerBranch.appendChild(li);
    });
  }

  window.addEventListener('DOMContentLoaded', init);
})();
