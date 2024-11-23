'use server';

import axios from 'axios';
import { redirect } from 'next/navigation';
import { getSession, updateSession } from '@/serverActions/auth';

export interface User {
  email: string;
  displayName: string;
  profileImg: string;
}
export interface UpdateUserParams {
  displayName: string | null;
  profileImgBase64: string | null;
}

export async function updateUser(body: UpdateUserParams) {
  const session = await getSession();
  const response = await axios.put(`${process.env.BASE_API}/auth/user`, body, {
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.GAPPLE_API_KEY,
      username: process.env.GAPPLE_API_USERNAME,
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  const updatedUser = response.data;
  await updateSession({
    user: {
      name: updatedUser.displayName,
      image: updatedUser.profileImg,
    },
  });
  redirect('/myaccount');
}

export async function authorizeUser() {
  const session = await getSession();
  const response = await axios.post(
    `${process.env.BASE_API}/auth/me`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        apikey: process.env.GAPPLE_API_KEY,
        username: process.env.GAPPLE_API_USERNAME,
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  );
  const json = response.data;
  return !!json?.email;
}
