import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const client = await clientPromise;
    const db = client.db("dashboard_db");

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "Benutzer nicht gefunden." }, { status: 404 });
    }

    // WICHTIG: bcrypt vergleicht das Klartext-Passwort mit dem Hash
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "Das Passwort ist leider falsch." }, { status: 401 });
    }

    const response = NextResponse.json({
      message: "Login erfolgreich",
      user: { firstName: user.firstName, lastName: user.lastName, email: user.email }
    });

    // Cookies setzen für Middleware und Dashboard
    response.cookies.set('isLoggedIn', 'true', { path: '/', httpOnly: false, maxAge: 60 * 60 * 24 });
    response.cookies.set('userName', user.firstName, { path: '/', httpOnly: false, maxAge: 60 * 60 * 24 });

    return response;
  } catch (e) {
    return NextResponse.json({ message: "Technischer Fehler" }, { status: 500 });
  }
}