export async function sendSubscriptionToServer(
  subscriptionId: string,
  accessToken: string,
) {
  try {
    const response = await fetch('/api/onesignal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ subscriptionId }),
    });

    if (response.ok) {
      console.log('구독 정보 저장 성공!');
    } else {
      console.error('구독 정보 저장 실패');
    }
  } catch (error) {
    console.error('구독 정보 서버 전송 중 에러 발생:', error);
  }
}
