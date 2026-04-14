import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password } = await request.json();
    const client = await clientPromise;
    const db = client.db("dashboard_db");

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "E-Mail existiert bereits" }, { status: 400 });
    }

    // Passwort verschlüsseln
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Das verschlüsselte Passwort speichern
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "User erstellt", id: result.insertedId }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: "Fehler beim Speichern" }, { status: 500 });
  }
}