import jwt from 'jsonwebtoken';

export type WpJwtUser = {
  sub: string;
  email?: string;
  roles?: string[];
};

export async function verifyWpJwt(token: string): Promise<WpJwtUser | null> {
  try {
    const hsSecret = process.env.WP_JWT_SECRET;
    const rsPublic = process.env.WP_JWT_PUBLIC_KEY;

    let decoded: any;
    if (rsPublic) {
      decoded = jwt.verify(token, rsPublic, { algorithms: ['RS256'] });
    } else if (hsSecret) {
      decoded = jwt.verify(token, hsSecret, { algorithms: ['HS256'] });
    } else {
      return null;
    }

    const sub = typeof decoded.sub === 'string' ? decoded.sub : String(decoded.user_id ?? '');
    if (!sub) return null;

    const email = typeof decoded.email === 'string' ? decoded.email : undefined;
    const roles = Array.isArray(decoded.roles) ? decoded.roles as string[] : undefined;
    return { sub, email, roles };
  } catch {
    return null;
  }
}


