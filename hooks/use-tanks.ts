// penguinapp/hooks/use-tanks.ts
"use client";
import { useState, useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { TankData } from "@/lib/types";

export function useTanks() {
  const [tanks, setTanks] = useState<TankData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "tanks"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TankData[];
      setTanks(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { tanks, loading };
}