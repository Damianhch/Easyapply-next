import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyWpJwt } from './lib/auth';

export async function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  const protectApiApplicationsPost = pathname === '/api/applications' && req.method === 'POST';
  const protectDashboard = pathname.startsWith('/dashboard');

  if (!(protectApiApplicationsPost || protectDashboard)) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get('authorization');
  const bearer = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const cookieToken = req.cookies.get('wp_jwt')?.value;
  const token = bearer || cookieToken;

  if (!token) return redirectToWpLogin(url.toString());

  const user = await verifyWpJwt(token);
  if (!user) return redirectToWpLogin(url.toString());

  return NextResponse.next();
}

function redirectToWpLogin(currentUrl: string) {
  const base = process.env.WP_BASE_URL || 'https://example.com';
  const loginUrl = `${base.replace(/\/$/, '')}/wp-login.php?redirect_to=${encodeURIComponent(currentUrl)}`;
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/applications'],
};


