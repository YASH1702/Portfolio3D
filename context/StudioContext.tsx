"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export type MonitorDisplayMode = "code" | "terminal" | "architecture";

interface StudioContextType {
  isNightMode: boolean;
  toggleNightMode: () => void;
  isLampOn: boolean;
  toggleLamp: () => void;
  monitorMode: MonitorDisplayMode;
  cycleMonitorMode: () => void;
  setMonitorMode: (mode: MonitorDisplayMode) => void;
}

const StudioContext = createContext<StudioContextType | null>(null);

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const [isNightMode, setIsNightMode] = useState(false);
  const [isLampOn, setIsLampOn] = useState(true);
  const [monitorMode, setMonitorMode] = useState<MonitorDisplayMode>("code");

  const toggleNightMode = useCallback(() => {
    setIsNightMode((prev) => !prev);
  }, []);

  const toggleLamp = useCallback(() => {
    setIsLampOn((prev) => !prev);
  }, []);

  const cycleMonitorMode = useCallback(() => {
    setMonitorMode((prev) => {
      if (prev === "code") return "terminal";
      if (prev === "terminal") return "architecture";
      return "code";
    });
  }, []);

  // Keyboard navigation listener (keys 1-4 and Arrow navigation)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      const activeTag = document.activeElement?.tagName;
      if (activeTag === "INPUT" || activeTag === "TEXTAREA" || activeTag === "SELECT") {
        return;
      }

      const getMaxScroll = () =>
        Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);

      const scrollToFraction = (fraction: number) => {
        const targetY = fraction * getMaxScroll();
        window.scrollTo({ top: targetY, behavior: "smooth" });
      };

      if (e.key === "1") {
        e.preventDefault();
        scrollToFraction(0.0);
      } else if (e.key === "2") {
        e.preventDefault();
        scrollToFraction(0.42);
      } else if (e.key === "3") {
        e.preventDefault();
        scrollToFraction(0.74);
      } else if (e.key === "4") {
        e.preventDefault();
        scrollToFraction(0.95);
      } else if (e.key.toLowerCase() === "n") {
        // Toggle Day / Night mode with 'N'
        e.preventDefault();
        toggleNightMode();
      } else if (e.key.toLowerCase() === "l") {
        // Toggle Desk Lamp with 'L'
        e.preventDefault();
        toggleLamp();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleNightMode, toggleLamp]);

  return (
    <StudioContext.Provider
      value={{
        isNightMode,
        toggleNightMode,
        isLampOn,
        toggleLamp,
        monitorMode,
        cycleMonitorMode,
        setMonitorMode,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
}

export function useStudio() {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error("useStudio must be used within a StudioProvider");
  }
  return context;
}
