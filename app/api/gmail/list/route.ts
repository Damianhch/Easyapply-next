import { NextResponse } from 'next/server';
import { listMessages } from '../../../../lib/gmail';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const q = url.searchParams.get('q') || undefined;
    const pageToken = url.searchParams.get('pageToken') || undefined;
    const data = await listMessages({ q, pageToken });
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 });
  }
}


