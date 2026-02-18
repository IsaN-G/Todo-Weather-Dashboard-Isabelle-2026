"use server";

import clientPromise from "@/lib/mongodb";
import { revalidatePath } from "next/cache";


export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle?: string;
  location?: string;
  phone?: string;
  website?: string;
  bio?: string;
}

export async function getUserAction(email: string) {
  try {
    const client = await clientPromise;
    const db = client.db("dashboard_db");
    const user = await db.collection("users").findOne({ email });

    if (!user) return { success: false, data: null };

    const data: UserData = {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      jobTitle: user.jobTitle || "",
      location: user.location || "",
      phone: user.phone || "",
      website: user.website || "",
      bio: user.bio || "",
    };

    return { success: true, data };
  } catch (error) {
    console.error("Ladefehler:", error);
    return { success: false, error: "Fehler" };
  }
}

export async function updateUserAction(formData: UserData) {
  try {
    const client = await clientPromise;
    const db = client.db("dashboard_db");

    await db.collection("users").updateOne(
      { email: formData.email },
      { $set: { ...formData, updatedAt: new Date() } },
      { upsert: true }
    );

    revalidatePath("/settings");
    return { success: true };
  } catch (error) {
    console.error("Speicherfehler:", error);
    return { success: false, error: "Fehler" };
  }
}