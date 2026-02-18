import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password } = await request.json();

    const client = await clientPromise;
    const db = client.db("dashboard_db");

    // Prüfen, ob User schon existiert
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "E-Mail existiert bereits" }, { status: 400 });
    }

    // User speichern
    const result = await db.collection("users").insertOne({
      firstName,
      lastName,
      email,
      password, // Hinweis: Später verschlüsseln wir das Passwort!
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "User erstellt", id: result.insertedId }, { status: 201 });
  } catch  {
    return NextResponse.json({ message: "Fehler beim Speichern" }, { status: 500 });
  }
}