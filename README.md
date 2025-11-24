# 🍧 아이쑤쿠림 : Brunch

## 🎙️ 프로젝트 개요
<div align="center">
<img width="256" height="256" alt="image" src="https://github.com/user-attachments/assets/ff85fd8c-597b-4138-8128-1b8148bbda03" />
 
**글이 작품이 되는 공간, 자유롭게 글을 쓰고 작품을 감상하는 브런치** </br>
저희 조는 기본적인 CRUD를 구성하고 싶었고 또한, 커뮤니티 플랫폼의 구조를 알아가기 위해 브런치를 선택하였습니다.

#### [프로젝트 바로가기](https://vanilla-04.netlify.app/)
</div>

## ⏱️ 프로젝트 기간
> 2025.11.10 ~ 2025.11.24

## 👨‍👩‍👧‍👦 팀원 소개
<div align="center">
 
| 이름 | 류혜진 | 장유석 | 백승준 | 채민기 |
| :----: | :------: | :------: | :------: | :------: |
| **역할** | PM | PL | 서기 | 발표 |
| **기능** | 글쓰기, 내서랍 | 작가 홈  | 상세, 발견 | 메인, 로그인, 회원가입 |
</div>

## 🔧 기술 스택
<div align="center">
 
| **분류** | **툴** |
| ---- | --- |
| **기술 스택** | <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white"/> <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=typescript&logoColor=white"/> |
| **개발 환경** | <img src="https://img.shields.io/badge/VisualStudioCode-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white"/> |
| **커뮤니케이션** | <img src="https://img.shields.io/badge/github-181717?style=flat-square&logo=github&logoColor=white"/> <img src="https://img.shields.io/badge/notion-000000?style=flat-square&logo=notion&logoColor=white"/> <img src="https://img.shields.io/badge/discord-5865F2?style=flat-square&logo=discord&logoColor=white"/>
| **API** | <img src="https://img.shields.io/badge/swagger-85EA2D?style=flat-square&logo=swagger&logoColor=white"/>
| **배포** | <img src="https://img.shields.io/badge/netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white"/> |
</div>

## 📱 서비스 소개

### 🔒 로그인, 회원가입
- 이메일 로그인 가능
- 회원가입은 유효성 검사에 맞게 입력
- 로그인 정보 저장 체크 박스 기능

<img width="225" height="550" alt="회원가입" src="https://github.com/user-attachments/assets/bb407415-02f3-422a-829f-571d7c0f8ad4" />
<img width="225" height="550" alt="회원가입_공백" src="https://github.com/user-attachments/assets/e87df603-c81e-4a44-8765-b6b577f93732" />
<img width="225" height="550" alt="로그인_공백" src="https://github.com/user-attachments/assets/5f0f46f3-d27c-4eec-8ad8-7d3a5d7507c8" />
<img width="225" height="550" alt="로그인" src="https://github.com/user-attachments/assets/ee8f0245-e063-4540-9ffb-954a7840fe4a" />

---

### 📄 메인 화면
- 작가들이 쓴 게시글, 인기 작가 확인 가능
- 게시글 및 작가 클릭 시 이동 기능

---

### 🔎 발견
- 검색어를 입력하여 게시글을 찾는 기능
<img width="250" height="550" alt="발견_공백" src="https://github.com/user-attachments/assets/5740b5bd-b8d8-4269-9ea3-74d099309d92" />
<img width="250" height="550" alt="발견" src="https://github.com/user-attachments/assets/5c9ee510-c4dd-4a98-8c70-949582aaedac" />

---

### 📝 글쓰기
- 제목, 소제목, 내용을 입력하여 게시글을 작성
- 사진 첨부 기능
<img width="250" height="550" alt="글쓰기_공백" src="https://github.com/user-attachments/assets/ef8b0586-2d29-434f-aeb9-89fd520912bd" />
<img width="250" height="550" alt="글쓰기" src="https://github.com/user-attachments/assets/a49050ea-d50e-45c5-9c15-ec9621ba043b" />

---

### 📖 상세 페이지
- 작성한 게시글의 제목, 작성자, 내용, 사진 등을 확인할 수 있는 기능
- 댓글 기능
- 작가 구독 기능 및 작가 홈 이동 기능

---

### 📰 작가 홈
- 작가의 프로필 사진, 정보, 작성 게시글을 볼 수 있는 기능
- 게시글 클릭 시 해당 게시글 이동하는 기능

---

### 🗃️ 내서랍
- 내가 구독한 작가, 최근 본 게시글, 좋아요 표시한 게시글을 확인하는 기능
- 내가 작성한 게시글을 확인하고 이동하는 기능

---

## 💫 트러블 슈팅
<div align="center">
 
| 이름 👤 | ❗ 문제점 | 🛠️ 해결 방법 |
| :---: | :------: | :---------: |
| 류혜진 | API 데이터 통신 흐름을 파악하지 못하여 타입 불일치 문제 발생. </br> 비로그인 상태에서 특정 페이지에 접근하였을 때 오류가 발생했음. | console.log를 활용하여 데이터의 흐름을 파악하여 옵셔널 체이닝 `?.`를 통해 문제를 해결했음. </br> token 검증 로직을 추가하여 비로그인 오류를 해결했음. |
| 장유석 | 메인에서 구독자 급등 작가를 눌렀을 때 작가 홈이 기본으로 설정해둔 프로필로 연결되는 문제를 파악했음. | 작가 홈으로 연결할 때 작가 개인의 id 값을 집어 넣어 작가 개개인의 홈으로 이동할 수 있게끔 설정을 하여 해결했음. |
| 백승준 | 게시글 id를 통해 렌더링을 진행하던 도중 작가의 데이터를 받아오지 못하는 문제를 발견. </br> 로그인이 안된 상태에서 글쓰기가 가능했기에 생긴 문제점을 파악했음. | 로그인이 안된 상태에서 글을 작성했던 게시물을 클릭하면 메인으로 이동하게 설계를 하여 문제를 해결했음. |
| 채민기 | 메인에서 로그인 인증 정보에 따라 헤더를 변경해야했지만, 로그인 인증 정보를 어떻게 가져오는지 몰랐음. </br> 로그인에서 사용한 이미지가 정상적으로 출력되지 않는 문제를 발견했음.  | 로그인 인증 정보는 sessionStorage를 활용하여 Token의 유무를 판단하여 헤더를 변경하는 방법으로 문제를 해결했음. </br> background-image 속성에서 no-reapeat을 주고 있어 제대로 인식하지 못하는 문제를 background 속성으로 변경하여 문제점을 해결했음. |
</div>

## 📚 회고

- 류혜진
  - 느낀점
    - 게시글에 관련된 CRUD를 기능 개발을 진행하며 스스로 구현한 것에 대해 성취감을 느낌
    - 서버-클라이언트 구조에 대해 지식이 상승하였으며, 현재 내 실력의 부족한 점을 파악하였음
    - API의 흐름, 작은 오류로 인해 전체적인 서비스가 오류가 날 수 있다는 것을 느낌
  - 개선 방안
    - API 데이터 구조 및 타입을 문서화
    - 데이터 흐름을 먼저 설계하고 UI는 그 후 연결하는 형태로 개발 방식 개선
- 장유석
  - 느낀점
    - 프로젝트의 일부를 맡아서 작업하는 경험이 책임감과 성취감을 얻게 된 것을 느낌
    - 소통을 통해 모르던 지식을 알아가며 나의 문제점을 파악할 수 있어서 좋았음
    - 모르는 것에 대한 시간 소비가 많아 팀원에게 빠르게 요청할 것을 아쉽게 느낌
  - 개선 방안
    - 더 적극적인 자세로 소통하면 더 효율적인 업무 처리를 할 수 있을 것 같음
- 백승준
  - 느낀점
    - API 서버 통신을 통해 데이터 렌더링하는 과정을 깨닫게 되어 성취감을 얻음
    - 작은 기능이라도 코드에 대해 깊게 고민하고 이해하는 시간을 통해 더 성장하는 것을 느낌
    - 이번 협업을 통해 전반적인 과정과 소통을 통해 부족한 지식을 채워갈 수 있었음
    - 여러 데이터를 가져오다보니 생각할 범위가 넓어져 디테일을 놓쳐 오류가 자주 발생해서 아쉬웠음
  - 개선 방안
    - 예외 처리를 통해 오류를 해결, 타입 설정을 엄격하게 정의하여 타입 에러를 줄이면 좋을 것 같음
    - 한 파일에 데이터 로딩, 이벤트 처리, 렌더링 등 여러 기능을 구현하다보니 가독성이 떨어져 분리해서 작업하는 것이 좋을 것 같음
- 채민기
  - 느낀점
    - 대학생때 이해 하지 못한 API 데이터 통신, 로그인, 회원가입 인증 절차 등을 경험하며 생각보다 복잡하다는 것을 깨달음
    - html, css에서 배운 grid, javscript에서 배운 event 처리 등을 공부하고, 실제로 사용해보면서 구현하니 뿌듯했음
    - typescript에 대해 얕게 알고있던 지식을 이론을 배우고 실습을 해보니 코드가 이해가 됐으며, 흐름 또한 파악하기 쉬워서 좋았음
    - 현재 내가 구상한 코드가 예외 처리가 덜되어서 약간의 오류가 발생하는 점이 되게 아쉬우며, 개발 공부가 더 필요하다는 것을 느낌
  - 개선 방안
    - 오류 처리에 대해 더 공부하고 꼼꼼하게 처리를 하는 것이 좋을 것 같음
    - 전체적인 디렉토리 구조의 기본 틀을 정해놓고 작업을 진행하는 것이 추후 디렉토리를 관리할 때 쉬울 것 같음

---

## 🗂️ 디렉토리 구조

```
📦vanilla-04-brunch  
 ┣ 📂.github (컨벤션 모음)  
 ┃ ┣ 📜Commit_Convention.md  
 ┃ ┣ 📜ISSUES_TEMPLATE.md  
 ┃ ┗ 📜PULL_REQUEST_TEMPLATE.md  
 ┣ 📂api  
 ┃ ┣ 📂bruno  
 ┃ ┗ 📂dbinit  
 ┣ 📂src (기능 폴더)
 ┃ ┣ 📂board (글쓰기)  
 ┃ ┃ ┣ 📂board-api  
 ┃ ┃ ┣ 📂board-css  
 ┃ ┃ ┣ 📂board-img  
 ┃ ┃ ┣ 📂board-ts  
 ┃ ┃ ┣ 📜update.html  
 ┃ ┃ ┗ 📜write.html  
 ┃ ┣ 📂common (공통 기본 스타일)  
 ┃ ┣ 📂components (헤더, 푸터, 내비 컴포넌트)  
 ┃ ┣ 📂details (상세 페이지)  
 ┃ ┃ ┣ 📂images  
 ┃ ┃ ┣ 📜details.css    
 ┃ ┃ ┣ 📜details.html    
 ┃ ┃ ┣ 📜details.ts    
 ┃ ┃ ┗ 📜type.ts    
 ┃ ┣ 📂drawer (내서랍)  
 ┃ ┃ ┣ 📂drawer-api  
 ┃ ┃ ┣ 📂drawer-img  
 ┃ ┃ ┣ 📂drawer-ts  
 ┃ ┃ ┣ 📂drawer_css  
 ┃ ┃ ┗ 📜user-activity.html  
 ┃ ┣ 📂footer (푸터)  
 ┃ ┃ ┣ 📂img  
 ┃ ┃ ┣ 📜footer.css  
 ┃ ┃ ┗ 📜footer.html  
 ┃ ┣ 📂header (헤더)  
 ┃ ┃ ┣ 📂img  
 ┃ ┃ ┣ 📜header.css  
 ┃ ┃ ┗ 📜header.html  
 ┃ ┣ 📂main-page (메인 페이지)  
 ┃ ┃ ┣ 📂img  
 ┃ ┃ ┣ 📜main-page.css  
 ┃ ┃ ┣ 📜main-page.html  
 ┃ ┃ ┣ 📜main-page.ts  
 ┃ ┃ ┗ 📜type.ts  
 ┃ ┣ 📂search (발견)  
 ┃ ┃ ┣ 📂images  
 ┃ ┃ ┣ 📜search.css  
 ┃ ┃ ┣ 📜search.html  
 ┃ ┃ ┣ 📜search.ts  
 ┃ ┃ ┗ 📜type.ts  
 ┃ ┣ 📂user (로그인, 회원가입)  
 ┃ ┃ ┣ 📂img  
 ┃ ┃ ┣ 📂login  
 ┃ ┃ ┃ ┣ 📜login.css  
 ┃ ┃ ┃ ┣ 📜login.html  
 ┃ ┃ ┃ ┗ 📜login.ts  
 ┃ ┃ ┗ 📂sign-up  
 ┃ ┃ ┃ ┣ 📜sign-up.css  
 ┃ ┃ ┃ ┣ 📜sign-up.html  
 ┃ ┃ ┃ ┗ 📜sign-up.ts  
 ┃ ┣ 📂utils (axios 통신)  
 ┃ ┃ ┗ 📜axios.ts  
 ┃ ┗ 📂writer-home (작가 홈)  
 ┃ ┃ ┣ 📜writer-home.css  
 ┃ ┃ ┣ 📜writer-home.html  
 ┃ ┃ ┗ 📜writer-home.ts
```
