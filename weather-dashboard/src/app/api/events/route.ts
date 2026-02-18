import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";

const DB_NAME = "dashboard_db";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userName = cookieStore.get("userName")?.value;

    if (!userName) return NextResponse.json([], { status: 200 });

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    const events = await db.collection("events").find({ userId: userName }).toArray();
    return NextResponse.json(events);
  } catch {
    return NextResponse.json({ error: "Fehler beim Laden" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const userName = cookieStore.get("userName")?.value;
    if (!userName) return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });

    const body = await request.json();
    const client = await clientPromise;
    const db = client.db(DB_NAME);

   
    const result = await db.collection("events").insertOne({
      ...body,
      userId: userName,
      createdAt: new Date()
    });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Fehler beim Speichern" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const cookieStore = await cookies();
    const userName = cookieStore.get("userName")?.value;

    if (!id || !userName) return NextResponse.json({ error: "Ungültig" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    await db.collection("events").deleteOne({ 
      _id: new ObjectId(id),
      userId: userName 
    });
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Löschen fehlgeschlagen" }, { status: 500 });
  }
}