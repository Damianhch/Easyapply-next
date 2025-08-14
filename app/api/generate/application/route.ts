import { NextResponse } from 'next/server';
import { db } from '../../../../lib/db';
import { z } from 'zod';

const BodySchema = z.object({
  applicationId: z.string().min(1),
  inputs: z.record(z.any()).optional(),
});

function generateCoverLetter(app: {
  fullName: string; position: string; company: string;
}) {
  return `Dear ${app.company},\n\nMy name is ${app.fullName}. I am excited to apply for the ${app.position} position at ${app.company}.\n\nBest regards,\n${app.fullName}`;
}

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const { applicationId } = parsed.data;
  const app = await db.jobApplication.findUnique({ where: { id: applicationId } });
  if (!app) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const coverLetter = generateCoverLetter({ fullName: app.fullName, position: app.position, company: app.company });

  await db.jobApplication.update({ where: { id: app.id }, data: { coverLetter } });
  return NextResponse.json({ coverLetter });
}


