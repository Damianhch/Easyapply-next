import { NextResponse } from 'next/server';

type BodyInput = {
  applicationId?: string;
  inputs?: Record<string, unknown>;
};

function generateCoverLetter(app: {
  fullName: string; position: string; company: string;
}) {
  return `Dear ${app.company},\n\nMy name is ${app.fullName}. I am excited to apply for the ${app.position} position at ${app.company}.\n\nBest regards,\n${app.fullName}`;
}

export async function POST(req: Request) {
  const json = (await req.json().catch(() => null)) as BodyInput | null;
  if (!json || !json.applicationId) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
  // Simplified: generate placeholder content without DB lookup
  const coverLetter = generateCoverLetter({ fullName: 'Applicant', position: 'Position', company: 'Company' });
  return NextResponse.json({ coverLetter });
}


