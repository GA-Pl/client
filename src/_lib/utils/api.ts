import axios, { AxiosRequestConfig } from 'axios';
import { NextResponse } from 'next/server';
import { BASE_URL } from '@/_lib/utils/config';
import { getSessionOrReject } from '@/_lib/utils/session';

export async function apiRequest(
  method: 'get' | 'post' | 'delete' | 'patch' | 'put',
  endpoint: string,
  data?: any,
  contentType?: string,
) {
  const session = await getSessionOrReject();

  if (session instanceof NextResponse) return session;

  const { accessToken } = session;

  if (!accessToken) {
    throw new Error('Authorization token is required');
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
  };

  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  const options: AxiosRequestConfig = {
    method,
    headers,
    url: `${BASE_URL}${endpoint}`,
    ...(method !== 'get' && { data }),
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error(`API 호출 실패: ${endpoint}`, error);
    throw new Error('API request failed');
  }
}
