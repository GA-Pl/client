export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_SECRET: string;
      AUTH_NAVER_ID: string;
      AUTH_NAVER_SECRET: string;
      BASE_API: string;
      GAPPLE_API_KEY: string;
      GAPPLE_API_USERNAME: string;
    }
  }
}
