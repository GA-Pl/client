import { NextRequest } from 'next/server';

export default function extractUrlId(req: NextRequest): {
  host: string;
  id: string;
} {
  const host = req.headers.get('host') ?? 'https://gapple-client.vercel.app';
  const url = new URL(req.url, `http://${host}`);
  const id = url.pathname.split('/').pop() ?? '';
  return { host, id };
}
