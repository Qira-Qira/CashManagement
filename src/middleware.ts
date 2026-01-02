import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  // Public routes
  const publicRoutes = ['/', '/api/auth/login'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // If accessing public route, allow
  if (isPublicRoute) {
    // Redirect to dashboard if already logged in
    if (token && pathname === '/') {
      try {
        const decoded = verifyToken(token);
        if (decoded.role === 'super_admin') {
          return NextResponse.redirect(new URL('/dashboard/super-admin', request.url));
        } else if (decoded.role === 'admin_bendahara') {
          return NextResponse.redirect(new URL('/dashboard/admin', request.url));
        } else {
          return NextResponse.redirect(new URL('/dashboard/user', request.url));
        }
      } catch (error) {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // Protected routes - check token
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const decoded = verifyToken(token);

    // Role-based access control
    if (pathname.startsWith('/dashboard/super-admin') && decoded.role !== 'super_admin') {
      return NextResponse.redirect(new URL('/dashboard/user', request.url));
    }

    if (pathname.startsWith('/dashboard/admin') && decoded.role !== 'admin_bendahara') {
      return NextResponse.redirect(new URL('/dashboard/user', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/auth/:path*'],
};
