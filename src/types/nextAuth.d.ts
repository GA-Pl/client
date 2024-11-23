export declare module 'next-auth' {
  interface User {
    accessToken: string;
    refreshToken: string;
    image?: string;
    selfIntro?: string;
  }
  interface Session {
    accessToken: string;
    refreshToken: string;
    nickname?: string;
    name?: string;
    image?: string;
    selfIntro?: string;
    profileImg?: string;
    userId?: number;
  }
}
export declare module '@auth/core/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
  }
}
