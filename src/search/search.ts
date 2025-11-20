const searchInput = document.querySelector('#search-input-field') as HTMLInputElement;
const searchInputClearBtn = document.querySelector('.search-input-clear-btn') as HTMLElement;

// 검색어 값이 변경될 때마다 클리어 버튼 활성/비활성화
searchInput.addEventListener('input', () => {
  const inputValue = searchInput.value.trim();
  const urlParams = new URLSearchParams(window.location.search);

  if (inputValue.length) {
    searchInputClearBtn.classList.add('show-btn');
    urlParams.set('q', inputValue);
  } else {
    searchInputClearBtn.classList.remove('show-btn');
    urlParams.delete('q');
  }

  const currentPath = window.location.pathname;
  console.log(currentPath);

  // 새로운 URL (기존 경로 + 새로운 쿼리 문자열)
  const newUrl = currentPath + (urlParams.toString() ? '?' + urlParams.toString() : '');

  // pushState를 사용하여 URL을 업데이트합니다.
  // 첫 번째 인수: state 객체 (선택 사항, 보통 null), 두 번째 인수: title (무시됨), 세 번째 인수: 새로운 URL
  window.history.pushState(null, '', newUrl);

  console.log('URL이 업데이트되었습니다:', newUrl);
});

// 검색어 클리어 버튼
searchInputClearBtn.addEventListener('click', () => {
  searchInput.value = '';
  searchInputClearBtn.classList.remove('input-clear');
});
