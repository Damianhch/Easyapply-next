import { NextResponse } from 'next/server';
import { getMessage } from '../../../../lib/gmail';

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
  try {
    const data = await getMessage(params.id);
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 });
  }
}


