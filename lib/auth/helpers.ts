import { verifyAccessToken, extractTokenFromHeader } from './jwt';

export interface AuthContext {
  userId: string;
  email: string;
  role: 'user' | 'admin';
  isAuthenticated: boolean;
}

export async function getAuthContext(authHeader?: string): Promise<AuthContext> {
  const token = extractTokenFromHeader(authHeader);

  if (!token) {
    return {
      userId: '',
      email: '',
      role: 'user',
      isAuthenticated: false,
    };
  }

  const payload = await verifyAccessToken(token);

  if (!payload) {
    return {
      userId: '',
      email: '',
      role: 'user',
      isAuthenticated: false,
    };
  }

  return {
    userId: payload.sub,
    email: payload.email,
    role: payload.role || 'user',
    isAuthenticated: true,
  };
}

export function requireAuth(context: AuthContext) {
  if (!context.isAuthenticated) {
    throw new Error('Unauthorized: Authentication required');
  }
  return context;
}

export function requireAdmin(context: AuthContext) {
  if (!context.isAuthenticated || context.role !== 'admin') {
    throw new Error('Unauthorized: Admin access required');
  }
  return context;
}

export function createResponse<T>(data: T, status: number = 200, headers?: Record<string, string>) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      ...headers,
    },
  });
}

export function createErrorResponse(message: string, status: number = 400) {
  return createResponse({ error: message }, status);
}

export function setCookie(name: string, value: string, options?: { maxAge?: number; path?: string; secure?: boolean; httpOnly?: boolean }) {
  const parts = [`${name}=${value}`];

  if (options?.maxAge) {
    parts.push(`Max-Age=${options.maxAge}`);
  }

  if (options?.path) {
    parts.push(`Path=${options.path}`);
  }

  if (options?.secure) {
    parts.push('Secure');
  }

  if (options?.httpOnly) {
    parts.push('HttpOnly');
  }

  return parts.join('; ');
}

export function parseRequestBody(request: Request) {
  const contentType = request.headers.get('content-type');

  if (!contentType?.includes('application/json')) {
    throw new Error('Content-Type must be application/json');
  }

  return request.json();
}
