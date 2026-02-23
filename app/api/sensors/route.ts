// penguinapp/app/api/sensors/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, updateDoc, collection, addDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { Status } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tankId, ph, turbidity, tds, temperature, tankLevel } = body;

    if (!tankId) return NextResponse.json({ error: "tankId is required" }, { status: 400 });

    // 1. Logic to determine Status based on your types.ts
    // You can customize these thresholds
    let status: Status = "Safe";
    if (ph < 6.5 || ph > 8.5 || tds > 500) status = "Warning";
    if (ph < 5.5 || ph > 9.5 || tds > 1000 || turbidity > 50) status = "Critical";

    // 2. Update Live Tank Document
    const tankRef = doc(db, "tanks", tankId);
    await updateDoc(tankRef, {
      ph,
      turbidity,
      tds,
      tankLevel,
      status,
      lastUpdated: serverTimestamp(),
    });

    // 3. Log to History for Charts
    await addDoc(collection(db, "history"), {
      tankId,
      ph,
      turbidity,
      tds,
      time: new Date().toISOString(), // Matches HistoricalDataPoint type
      timestamp: serverTimestamp(), // For Firestore sorting
    });

    // 4. Create Alert if Critical
    if (status === "Critical") {
      await addDoc(collection(db, "alerts"), {
        message: `Critical levels detected in ${tankId}`,
        severity: "Critical",
        timestamp: new Date().toISOString(),
        smsSent: false,
        acknowledged: false,
        source: tankId
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}