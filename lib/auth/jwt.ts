import * as jose from 'jose';

const JWT_ALGORITHM = 'HS256';

interface JWTPayload {
  sub: string; // user ID
  email: string;
  role?: 'user' | 'admin';
  iat: number;
  exp: number;
}

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

function getSecret(type: 'access' | 'refresh'): Uint8Array {
  const secret =
    type === 'access'
      ? process.env.JWT_SECRET || 'dev-secret-key-min-32-chars-please-change'
      : process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret-min-32-chars-please-change';

  // Ensure minimum 32 characters for HS256
  if (secret.length < 32) {
    console.warn(`[AUTH] Secret too short for ${type} token (${secret.length} chars, min 32 required)`);
  }

  return new TextEncoder().encode(secret.padEnd(32, '0'));
}

export async function generateAccessToken(userId: string, email: string, role: 'user' | 'admin' = 'user'): Promise<string> {
  const secret = getSecret('access');
  const payload: JWTPayload = {
    sub: userId,
    email,
    role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 15 * 60, // 15 minutes
  };

  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .sign(secret);
}

export async function generateRefreshToken(userId: string, email: string): Promise<string> {
  const secret = getSecret('refresh');
  const payload: JWTPayload = {
    sub: userId,
    email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days
  };

  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .sign(secret);
}

export async function generateTokenPair(
  userId: string,
  email: string,
  role: 'user' | 'admin' = 'user'
): Promise<TokenPair> {
  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken(userId, email, role),
    generateRefreshToken(userId, email),
  ]);

  return { accessToken, refreshToken };
}

export async function verifyAccessToken(token: string): Promise<JWTPayload | null> {
  try {
    const secret = getSecret('access');
    const verified = await jose.jwtVerify(token, secret);
    return verified.payload as JWTPayload;
  } catch (error) {
    console.error('[AUTH] Access token verification failed:', error);
    return null;
  }
}

export async function verifyRefreshToken(token: string): Promise<JWTPayload | null> {
  try {
    const secret = getSecret('refresh');
    const verified = await jose.jwtVerify(token, secret);
    return verified.payload as JWTPayload;
  } catch (error) {
    console.error('[AUTH] Refresh token verification failed:', error);
    return null;
  }
}

export async function verifyAdminToken(token: string): Promise<JWTPayload | null> {
  try {
    const payload = await verifyAccessToken(token);
    if (payload && payload.role === 'admin') {
      return payload;
    }
    return null;
  } catch (error) {
    console.error('[AUTH] Admin token verification failed:', error);
    return null;
  }
}

export function extractTokenFromHeader(authHeader?: string): string | null {
  if (!authHeader) return null;
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null;
  return parts[1];
}

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}
