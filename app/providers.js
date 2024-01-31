"use client";
import { ImageProvider } from "@/context/imageContext";
import { SettingsProvider } from "@/context/settingsContext";
import React, { useEffect } from "react";

export default function Providers({ children }) {
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  return (
    <SettingsProvider>
      <ImageProvider>{children}</ImageProvider>
    </SettingsProvider>
  );
}
