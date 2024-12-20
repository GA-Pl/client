import axios from 'axios';

export async function sendSubscriptionToServer(
  subscriptionId: string,
  accessToken: string,
) {
  try {
    console.log('보내는 데이터 확인:');
    console.log('subscriptionId:', subscriptionId);
    console.log('{subscriptionId}:', { subscriptionId });
    console.log('accessToken:', accessToken);

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

    console.log('서버 응답:', response.status, response.data);

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
