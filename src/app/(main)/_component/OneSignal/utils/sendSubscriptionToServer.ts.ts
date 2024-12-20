import axios from 'axios';

export async function sendSubscriptionToServer(
  subscriptionId: string,
  accessToken: string,
) {
  try {
    const response = await axios.post(
      '/api/onesignal',
      { subscriptionId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.status === 200) {
      console.log('구독 정보 저장 성공!');
    } else {
      console.error('구독 정보 저장 실패');
    }
  } catch (error: any) {
    console.error(
      '구독 정보 서버 전송 중 에러 발생:',
      error.response?.data || error.message,
    );
  }
}
