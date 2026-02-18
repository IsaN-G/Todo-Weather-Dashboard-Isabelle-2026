"use server";

import clientPromise from "@/lib/mongodb";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers"; 

const DB_NAME = "dashboard_db";

export async function addTodoAction(formData: FormData) {
  const text = formData.get("todoText") as string;
  
  
  const cookieStore = await cookies();
  const userName = cookieStore.get("userName")?.value || "Gast";

  if (!text || text.trim() === "") return { error: "Leer" };

  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    
    await db.collection("todos").insertOne({
      text: text.trim(),
      userId: userName, 
      completed: false,
      createdAt: new Date()
    });

    revalidatePath("/");
    return { success: true };
  } catch  {
    return { error: "Fehler beim Speichern" };
  }
}

export async function deleteTodoAction(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    await db.collection("todos").deleteOne({ _id: new ObjectId(id) });
    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
}

export async function toggleTodoAction(id: string, currentStatus: boolean) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    await db.collection("todos").updateOne(
      { _id: new ObjectId(id) },
      { $set: { completed: !currentStatus } }
    );
    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
}