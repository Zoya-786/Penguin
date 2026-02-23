import { rtdb } from "@/lib/firebase";
import { ref, set, update } from "firebase/database";

export const initializeMockTank = async () => {
  const tankId = "alpha-test";
  const tankRef = ref(rtdb, `tanks/${tankId}`);

  // Initial hardcoded state
  await set(tankRef, {
    name: "Emerald Basin (Simulated)",
    ph: 7.2,
    tankLevel: 85,
    status: "Nominal",
    lastUpdated: Date.now()
  });

  // Start the "Time" simulation
  setInterval(() => {
    const newPh = (7.0 + Math.random() * 0.5).toFixed(2);
    const newLevel = Math.floor(80 + Math.random() * 10);
    
    update(tankRef, {
      ph: parseFloat(newPh),
      tankLevel: newLevel,
      status: newPh > 7.4 ? "Warning" : "Nominal",
      lastUpdated: Date.now()
    });
  }, 5000); // Updates every 5 seconds to show "working over time"
};