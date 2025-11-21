import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // 메인 페이지
        index: 'index.html',

        mainPage: 'src/main-page/main-page.html',
        login: 'src/user/login/login.html',
        signUp: 'src/user/sign-up/sign-up.html',
        userActivity: 'src/drawer/user-activity.html',
        write: 'src/board/write.html',
        search: 'src/search/search.html',
        details: 'src/details/details.html',
        writerHome: 'src/writer-home/writer-home.html',
      },
    },
  },
  appType: 'mpa', // fallback 사용안함
});
