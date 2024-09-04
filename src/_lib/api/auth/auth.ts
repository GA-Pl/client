import axios from 'axios';

type ResponseValue = {
  user: {
    email: string;
    displayName: string;
    profileImg?: string;
  };
  accessToken: string;
};

async function _existUser(email: string) {
  const headers = {
    'Content-Type': 'application/json',
    apikey: process.env.GAPPLE_API_KEY!,
    username: process.env.GAPPLE_API_USERNAME!,
  };

  try {
    const response = await axios.get(`${process.env.BASE_API}/auth/exists`, {
      params: { email },
      headers,
    });

    return response.data as boolean;
  } catch (error) {
    console.error(error);
    throw new Error('사용자 확인 중 문제가 발생했습니다.');
  }
}

async function _signIn(
  type: 'oauth/signup' | 'oauth/login',
  body: {
    email: string;
    accessToken: string;
    refreshToken: string;
    displayName?: string;
    profileImg?: string;
  },
) {
  const headers = {
    'Content-Type': 'application/json',
    apikey: process.env.GAPPLE_API_KEY!,
    username: process.env.GAPPLE_API_USERNAME!,
  };

  try {
    const response = await axios.post(
      `${process.env.BASE_API}/auth/${type}`,
      body,
      {
        headers,
      },
    );
    const data = response.data as ResponseValue | string;

    if (typeof data !== 'string') {
      return {
        email: data.user.email,
        name: data.user.displayName || data.user.email.split('@')[0],
        image: data.user.profileImg,
        accessToken: data.accessToken,
      };
    } else {
      throw new Error(data);
    }
  } catch (error) {
    console.error(error);
    throw new Error(
      '회원가입 또는 로그인 중 문제가 발생했습니다, 잠시 후 다시 시도하세요.',
    );
  }
}

export { _signIn, _existUser };
