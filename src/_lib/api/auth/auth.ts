import axios from 'axios';

type ResponseValue = {
  email: string;
  name: string;
  profileImg?: string;
  userId: number;
  accessToken: string;
  refreshToken: string;
};

async function _existUser(
  email: string,
  type: 'KAKAO' | 'NAVER',
): Promise<boolean> {
  const headers = {
    'Content-Type': 'application/json',
    apikey: process.env.GAPPLE_API_KEY!,
    username: process.env.GAPPLE_API_USERNAME!,
  };

  try {
    const response = await axios.get(`${process.env.BASE_API}/auth/exists`, {
      params: { type, email },
      headers,
    });

    return response.status === 200;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return false;
    }
    console.error(error);
    throw new Error('사용자 확인 중 문제가 발생했습니다.');
  }
}

async function _signIn(
  type: 'oauth/signup' | 'oauth/login',
  body: {
    email?: string;
    accessToken: string;
    refreshToken: string;
    displayName: string;
    profileImg?: string;
    type?: 'KAKAO' | 'NAVER';
  },
) {
  const headers = {
    'Content-Type': 'application/json',
    apikey: process.env.GAPPLE_API_KEY!,
    username: process.env.GAPPLE_API_USERNAME!,
  };

  const requestBody = {
    ...body,
  };

  try {
    const response = await axios.post(
      `${process.env.BASE_API}/auth/${type}`,
      requestBody,
      { headers },
    );

    const data = response.data.data as ResponseValue;

    if (typeof data !== 'string') {
      return {
        userId: data.userId,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        name: data.name,
        email: data.email,
        profileImg: data.profileImg,
      };
    }
    throw new Error(data);
  } catch (error) {
    console.error('Error in _signIn:', error);
    throw new Error(
      '회원가입 또는 로그인 중 문제가 발생했습니다, 잠시 후 다시 시도하세요.',
    );
  }
}

export { _signIn, _existUser };
