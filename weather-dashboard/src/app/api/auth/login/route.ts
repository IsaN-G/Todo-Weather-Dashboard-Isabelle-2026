import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const client = await clientPromise;
    const db = client.db("dashboard_db");

    // 1. Suchen, ob ein User mit dieser E-Mail existiert
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Benutzer nicht gefunden. Bitte registriere dich zuerst." },
        { status: 404 }
      );
    }

    // 2. Passwort vergleichen (einfacher Textvergleich für den Anfang)
    if (user.password !== password) {
      return NextResponse.json(
        { message: "Das Passwort ist leider falsch." },
        { status: 401 }
      );
    }

    // 3. Erfolg! Wir geben die Daten zurück, damit das Dashboard sie anzeigen kann
    return NextResponse.json({
      message: "Login erfolgreich",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (e) {
    console.error("Login Fehler:", e);
    return NextResponse.json(
      { message: "Ein technischer Fehler ist aufgetreten." },
      { status: 500 }
    );
  }
}