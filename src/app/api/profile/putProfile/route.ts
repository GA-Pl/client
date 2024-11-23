import { NextRequest, NextResponse } from 'next/server';
import { apiRequest } from '@/_lib/utils/api';
import extractErrorMessage from '@/_lib/utils/extractErrorMessage';
import { updateSession } from '@/serverActions/auth';

export async function PUT(req: NextRequest) {
  const formData = await req.json();

  try {
    const response = await apiRequest('put', `/profile/user`, formData);

    const updatedUser = response.data;
    await updateSession({
      user: {
        name: formData.nickname,
        image: formData.profileImg,
        selfIntro: formData.selfIntro,
      },
    });

    // Return a successful response with the updated user data
    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    const errorMessage = extractErrorMessage(error);
    console.error('외부 API 호출 실패:', errorMessage);
    return NextResponse.json(
      { message: errorMessage },
      {
        status: errorMessage === 'Authorization token is required' ? 401 : 500,
      },
    );
  }
}
