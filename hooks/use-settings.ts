"use client";

import { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SettingsData } from "@/lib/types";

export function useSettings() {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const settingsRef = doc(db, "config", "app_settings");

  useEffect(() => {
    return onSnapshot(settingsRef, (doc) => {
      if (doc.exists()) {
        setSettings(doc.data() as SettingsData);
      }
    });
  }, []);

  const updateSettings = async (newSettings: SettingsData) => {
    await setDoc(settingsRef, newSettings);
  };

  return { settings, updateSettings };
}