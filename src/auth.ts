import NextAuth from 'next-auth';
import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from 'next-auth/providers/kakao';
import { _signIn, _existUser } from './_lib/api/auth/auth';

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update,
} = NextAuth({
  providers: [
    NaverProvider({
      clientId: process.env.AUTH_NAVER_ID,
      clientSecret: process.env.AUTH_NAVER_SECRET,
    }),
    KakaoProvider({
      clientId: process.env.AUTH_KAKAO_ID,
      clientSecret: process.env.AUTH_KAKAO_SECRET,
    }),
  ],
  trustHost: true,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },
  pages: {
    signIn: '/signIn',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async ({ account, user }) => {
      if (account && user) {
        if (account.provider === 'naver' || account.provider === 'kakao') {
          const type = (await _existUser(user.email as string))
            ? 'oauth/login'
            : 'oauth/signup';
          const userInfo = await _signIn(type, {
            email: user.email as string,
            accessToken: account.access_token as string,
            refreshToken: account.refresh_token as string,
            displayName: user.name as string,
            profileImg: user.image as string,
          });

          if (userInfo) {
            Object.assign(user, userInfo);
            return true;
          }

          return false;
        }
      }
      return true;
    },

    jwt: async ({ token, user, account, trigger, session }) => {
      if (user && account) {
        Object.assign(token, user);
      }
      if (trigger === 'update' && session) {
        Object.assign(token, session.user);
      }
      return token;
    },

    session: async ({ session, token }) => {
      Object.assign(session, token);
      return session;
    },
  },
});
