'use server';

import { auth, signIn, signOut, update } from '@/auth';

export const signInWithNaver = async () => {
  await signIn('naver', { redirectTo: '/' });
};

export const signInWithKakao = async () => {
  await signIn('kakao', { redirectTo: '/' });
};

export const signOutWithForm = async () => {
  await signOut();
};

export { auth as getSession, update as updateSession };
