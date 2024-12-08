import { NextRequest, NextResponse } from 'next/server';
import { apiRequest } from '@/_lib/utils/api';

export async function GET(
  req: NextRequest,
  context: { params: { slug: string } },
) {
  const { slug } = context.params;

  if (!slug) {
    return NextResponse.json(
      { message: 'Slug parameter is missing' },
      { status: 400 },
    );
  }

  try {
    const data = await apiRequest(
      'get',
      `/document/detail/plan?document_id=${slug}`,
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal Server Error';
    console.error('외부 API 호출 실패:', message);
    return NextResponse.json(
      { message },
      { status: message === 'Authorization token is required' ? 401 : 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { slug: string } },
) {
  const { slug } = context.params;

  if (!slug) {
    return NextResponse.json(
      { message: 'Slug parameter is missing' },
      { status: 400 },
    );
  }

  try {
    const data = await apiRequest(
      'delete',
      `/document/plan?document_id=${slug}`,
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal Server Error';
    console.error('외부 API 호출 실패 (DELETE):', message);
    return NextResponse.json(
      { message },
      { status: message === 'Authorization token is required' ? 401 : 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: { slug: string } },
) {
  const { slug } = context.params;

  if (!slug) {
    return NextResponse.json(
      { message: 'Slug parameter is missing' },
      { status: 400 },
    );
  }

  try {
    const body = await req.json();

    const data = await apiRequest(
      'put',
      `/document/plan?document_id=${slug}`,
      body,
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal Server Error';
    console.error('외부 API 호출 실패 (PUT):', message);
    return NextResponse.json(
      { message },
      { status: message === 'Authorization token is required' ? 401 : 500 },
    );
  }
}
