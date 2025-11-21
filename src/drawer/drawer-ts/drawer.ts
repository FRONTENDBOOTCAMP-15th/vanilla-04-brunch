import { userBranch, authorList, interPost } from './../drawer-api/drawer-main';

(() => {
  // 페이지 로드 후 실행
  const init = () => {
    renderUserList();
    favPost();
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
      img.src = image || '';
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

  // 관심 글'
  async function favPost() {
    const postInter = await interPost();

    const goodPost =
      postInter?.map((good) => ({
        title: good.title,
        author: good.author,
        postImage: good.postImage,
      })) || [];

    const interest = document.querySelector('.favorite .recent-list') as HTMLUListElement;

    interest.innerHTML = ''; // 초기화

    goodPost.forEach((good) => {
      const li = document.createElement('li');
      li.classList.add('post');

      li.innerHTML = `
        <div class="card">
          <img src="${good.postImage}" alt="${good.title}"  />
          <div class="white-box">
            <h3 class="title">${good.title}</h3>
            <p class="post-author">${good.author}</p>
          </div>
        </div>
      `;

      interest.appendChild(li);
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
