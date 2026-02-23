"use client";
import { rtdb } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";

export function useWaterData() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Listen for Live Water Data
    const waterRef = ref(rtdb, 'water');
    const unsubWater = onValue(waterRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const nodeList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setNodes(nodeList);
      }
      setLoading(false);
    });

    // 2. Listen for Alerts (Last 5)
    const alertsRef = ref(rtdb, 'alerts');
    const unsubAlerts = onValue(alertsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const alertList = Object.values(data).reverse().slice(0, 5);
        setAlerts(alertList);
      }
    });

    return () => { unsubWater(); unsubAlerts(); };
  }, []);

  return { nodes, alerts, loading };
}