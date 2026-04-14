import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';
  const { pathname } = request.nextUrl;

  // 1. Dateien von Next.js und Bilder ignorieren (verhindert Loops)
  if (pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next();
  }

  // 2. Wenn nicht eingeloggt und nicht auf Login/Register -> Ab zum Login
  if (!isLoggedIn && pathname !== '/login' && pathname !== '/register') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. Wenn eingeloggt und auf Login -> Ab zum Dashboard
  if (isLoggedIn && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};