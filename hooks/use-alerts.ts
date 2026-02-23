"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Alert } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, "alerts"), orderBy("timestamp", "desc"), limit(10));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const newAlert = { id: change.doc.id, ...change.doc.data() } as Alert;
          // Trigger a toast for new critical alerts
          if (newAlert.severity === "Critical" && !newAlert.acknowledged) {
            toast({
              variant: "destructive",
              title: "Critical Alert!",
              description: newAlert.message,
            });
          }
        }
      });

      const allAlerts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Alert[];
      setAlerts(allAlerts);
    });

    return () => unsubscribe();
  }, [toast]);

  return { alerts };
}