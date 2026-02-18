import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Wir können hier leider nicht auf localStorage zugreifen (da Server-Seite),
  // aber wir können prüfen, ob ein Auth-Cookie existiert.
  // Für den Moment lassen wir die Logik im Layout, da du localStorage nutzt.
  // Wenn du später auf Cookies umsteigst, ist das hier der Platz dafür!
  
  return NextResponse.next();
}

// Hier definierst du, welche Pfade die Middleware überwachen soll
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};