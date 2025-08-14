import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { verifyWpJwt } from '../../../lib/auth';
import { z } from 'zod';

const ApplicationSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  position: z.string().min(1),
  company: z.string().min(1),
  resumeUrl: z.string().url().optional(),
  metadata: z.any().optional(),
});

async function getJwtFromRequest(req: Request) {
  const auth = req.headers.get('authorization');
  if (auth?.startsWith('Bearer ')) return auth.slice(7);
  // No cookie access in Route Handler directly; use headers for Bearer in serverless
  return null;
}

export async function POST(req: Request) {
  const token = await getJwtFromRequest(req);
  const user = token ? await verifyWpJwt(token) : null;
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const json = await req.json().catch(() => null);
  const parsed = ApplicationSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const app = await db.jobApplication.create({
    data: {
      userId: user.sub,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone ?? null,
      position: data.position,
      company: data.company,
      resumeUrl: data.resumeUrl ?? null,
      metadata: data.metadata ?? undefined,
    },
  });
  return NextResponse.json({ id: app.id });
}

export async function GET(req: Request) {
  const token = await getJwtFromRequest(req);
  const user = token ? await verifyWpJwt(token) : null;
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const items = await db.jobApplication.findMany({
    where: { userId: user.sub },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
  return NextResponse.json({ items });
}


