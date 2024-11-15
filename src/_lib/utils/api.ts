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

  // contentType이 제공되면 추가
  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  // Axios 요청 옵션 설정
  const options: AxiosRequestConfig = {
    method,
    headers,
    url: `${BASE_URL}${endpoint}`,
    // GET 메소드가 아닌 경우, data를 추가
    ...(method !== 'get' && { data }),
  };

  try {
    // Axios 요청을 비동기적으로 처리
    const response = await axios(options);
    return response.data;
  } catch (error) {
    // 오류 처리 (API 호출 실패)
    console.error(`API 호출 실패: ${endpoint}`, error);
    throw new Error('API request failed');
  }
}
