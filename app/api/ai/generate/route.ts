import { NextResponse } from 'next/server';
import { z } from 'zod';

const Schema = z.object({
  prompt: z.string().min(1),
});

export async function POST(req: Request) {
  // Minimal placeholder: echo-like generation to keep things simple
  const json = await req.json().catch(() => null);
  const parsed = Schema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  const { prompt } = parsed.data;
  const result = `Generated (placeholder): ${prompt}`;
  return NextResponse.json({ text: result });
}


