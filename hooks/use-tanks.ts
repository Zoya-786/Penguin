import { rtdb } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";

export function useTanks() {
  const [tanks, setTanks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tanksRef = ref(rtdb, 'tanks');
    
    // Listen for data changes
    const unsubscribe = onValue(tanksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Transform the object keys into an array with IDs
        const tankList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setTanks(tankList);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { tanks, loading };
}