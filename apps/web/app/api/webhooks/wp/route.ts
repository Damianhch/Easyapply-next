import { NextResponse } from 'next/server';
import crypto from 'crypto';

function verifySignature(rawBody: string, signature: string | null) {
  const secret = process.env.API_SHARED_SECRET || '';
  if (!secret || !signature) return false;
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

export async function POST(req: Request) {
  const raw = await req.text();
  const sig = req.headers.get('x-signature');
  if (!verifySignature(raw, sig)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }
  let json: any = {};
  try { json = JSON.parse(raw); } catch {}
  // Upsert user metadata if desired
  return NextResponse.json({ ok: true });
}


