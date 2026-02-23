"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, onSnapshot, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { HistoricalDataPoint } from "@/lib/types";

export function useHistory(tankId: string) {
  const [history, setHistory] = useState<HistoricalDataPoint[]>([]);

  useEffect(() => {
    if (!tankId) return;

    const q = query(
      collection(db, "history"),
      where("tankId", "==", tankId),
      orderBy("timestamp", "desc"),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const points = snapshot.docs.map(doc => ({
        ...doc.data()
      })).reverse() as HistoricalDataPoint[];
      setHistory(points);
    });

    return () => unsubscribe();
  }, [tankId]);

  return { history };
}