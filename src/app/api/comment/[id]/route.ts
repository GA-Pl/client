import { NextRequest, NextResponse } from 'next/server';
import { apiRequest } from '@/_lib/utils/api';
import extractErrorMessage from '@/_lib/utils/extractErrorMessage';

// POST: 댓글 생성
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const formData = await request.json();

  try {
    const response = await apiRequest(
      'post',
      `/document/comment?id=${id}`,
      formData,
    );
    return NextResponse.json(response, { status: 200 });
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

// GET: 댓글 목록 가져오기
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    const data = await apiRequest('get', `/document/comments?id=${id}`);
    return NextResponse.json(data, { status: 200 });
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

// DELETE: 댓글 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    await apiRequest('delete', `/document/comment?id=${id}`);
    return NextResponse.json(
      { message: 'Comment deleted successfully' },
      { status: 200 },
    );
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

// PUT: 댓글 업데이트
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const formData = await request.json();

  try {
    const response = await apiRequest(
      'put',
      `/document/comment?id=${id}`,
      formData,
    );
    return NextResponse.json(response, { status: 200 });
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
