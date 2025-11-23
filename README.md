# 🍧 아이쑤쿠림 : Brunch

## 🎙️ 프로젝트 소개
<div align="center">
<img width="256" height="256" alt="image" src="https://github.com/user-attachments/assets/ff85fd8c-597b-4138-8128-1b8148bbda03" />
 
**글이 작품이 되는 공간, 자유롭게 글을 쓰고 작품을 감상하는 브런치 클론 코딩 프로젝트**
</div>

## ✅ 주제 선정 이유

<div align="center">
 저희 조는 기본적인 CRUD를 경험하고, 커뮤니티 플랫폼의 구조를 알아가기 위해 브런치를 선택했습니다.
</div>

## 👨‍👩‍👧‍👦 팀원 소개
<div align="center">
 
| 이름 | 류혜진 | 장유석 | 백승준 | 채민기 |
| ---- | ------ | ------ | ------ | ------ |
| **역할** | 팀장, PM | PL | 서기 | 발표 |
| **기능** | 글쓰기, 내서랍 | 작가 홈 | 상세 페이지, 발견 | 메인 페이지, 로그인, 회원가입 |
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
<div align="center">
 
</div>


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
 ┣ 📂src  
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
