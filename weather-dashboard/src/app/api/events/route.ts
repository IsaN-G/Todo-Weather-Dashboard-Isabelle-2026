import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

// Wir nutzen konsequent die dashboard_db, wie in deinem GET/POST
const DB_NAME = "dashboard_db";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const events = await db.collection("events").find({}).toArray();
    return NextResponse.json(events);
  } catch  {
    return NextResponse.json({ error: "Fehler beim Laden" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const result = await db.collection("events").insertOne({
      ...body,
      createdAt: new Date()
    });
    return NextResponse.json(result);
  } catch  {
    return NextResponse.json({ error: "Fehler beim Speichern" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Keine ID vorhanden" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME); // KORRIGIERT: Von 'kalender' zu 'dashboard_db'

    const result = await db.collection("events").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: "Termin gelöscht" });
    } else {
      return NextResponse.json({ error: "Termin nicht gefunden" }, { status: 404 });
    }
  } catch  {
    return NextResponse.json({ error: "Fehler beim Löschen" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json({ error: "Keine ID für Update vorhanden" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME); // KORRIGIERT: Von 'kalender' zu 'dashboard_db'
    
    const result = await db.collection("events").updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );

    return NextResponse.json({ message: "Aktualisiert", modifiedCount: result.modifiedCount });
  } catch {
    return NextResponse.json({ error: "Fehler beim Update" }, { status: 500 });
  }
}