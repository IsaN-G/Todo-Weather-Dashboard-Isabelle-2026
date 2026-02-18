import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const client = await clientPromise;
    const db = client.db("dashboard_db");

   
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Benutzer nicht gefunden. Bitte registriere dich zuerst." },
        { status: 404 }
      );
    }

    if (user.password !== password) {
      return NextResponse.json(
        { message: "Das Passwort ist leider falsch." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      message: "Login erfolgreich",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });

    response.cookies.set('isLoggedIn', 'true', {
      path: '/',
      httpOnly: false, 
      maxAge: 60 * 60 * 24, 
      sameSite: 'lax',
    });

    return response;
    
  } catch (e) {
    console.error("Login Fehler:", e);
    return NextResponse.json(
      { message: "Ein technischer Fehler ist aufgetreten." },
      { status: 500 }
    );
  }
}