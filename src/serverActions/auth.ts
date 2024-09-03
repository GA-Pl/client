'use server';

import { auth, signIn, signOut, update } from '@/auth';

export const signInWithNaver = async () => {
  await signIn('naver', { redirectTo: '/' });
};

export const signOutWithForm = async (formData: FormData) => {
  await signOut();
};

export { auth as getSession, update as updateSession };
