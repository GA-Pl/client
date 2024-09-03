import NextAuth from 'next-auth';
import NaverProvider from 'next-auth/providers/naver';
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
      authorization: {
        params: {
          grant_type: 'authorization_code',
        },
      },
    }),
  ],
  callbacks: {
    signIn: async ({ account, user }) => {
      console.log('=====signIn=====');
      console.log('account', account);
      console.log('user', user);
      if (account?.provider === 'naver') {
        try {
          const type = (await _existUser(user.email as string))
            ? 'oauth/login'
            : 'oauth/signup';

          const _user = await _signIn(type, {
            displayName: user.name as string,
            email: user.email as string,
            profileImg: user.image as string,
            accessToken: account.access_token as string,
            refreshToken: account.refresh_token as string,
          });
          Object.assign(user, _user);
        } catch (error) {
          if (error instanceof Error) {
            return `/error?message=${encodeURIComponent(error.message)}`;
          }
        }
        return false;
      }
      return true;
    },
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        console.log('=====jwt=====');
        console.log('user', user);
        console.log('token', token);
        console.log('trigger', trigger);
        console.log('session', session);
        Object.assign(token, user);
      }
      if (trigger === 'update' && session) {
        console.log('token', token);
        Object.assign(token, session.user);
        token.picture = session.user.image;
      }
      return token;
    },
    session: async ({ session, token }) => {
      console.log('=====session=====');
      session = { ...session, ...token };
      return session;
    },
  },
  pages: {},
});
