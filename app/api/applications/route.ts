import { NextResponse } from 'next/server';

type ApplicationInput = {
  fullName?: string;
  email?: string;
  phone?: string;
  position?: string;
  company?: string;
  resumeUrl?: string;
  metadata?: unknown;
};

export async function POST(req: Request) {
  const json = (await req.json().catch(() => null)) as ApplicationInput | null;
  if (!json || !json.fullName || !json.email || !json.position || !json.company) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const fakeId = 'app_' + Math.random().toString(36).slice(2, 10);
  return NextResponse.json({ id: fakeId });
}

export async function GET(req: Request) {
  // Simplified: return empty list
  return NextResponse.json({ items: [] });
}


