import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get('q');
  if (!q) return NextResponse.json({ error: 'Missing q' }, { status: 400 });
  // Simple proxy to OpenStreetMap Nominatim (no API key)
  const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&countrycodes=no&limit=5`, {
    headers: { 'User-Agent': 'EasyApply/1.0 (proxy)' },
    cache: 'no-store',
  });
  const data = await res.json();
  return NextResponse.json({ items: data });
}


