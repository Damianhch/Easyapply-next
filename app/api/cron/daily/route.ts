import { NextResponse } from 'next/server';

export async function GET() {
  // Placeholder: daily housekeeping
  return NextResponse.json({ ran: true, ts: Date.now() });
}


