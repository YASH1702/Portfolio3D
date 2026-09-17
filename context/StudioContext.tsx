"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import {
  initRainAudio,
  muteRainAudio,
  unmuteRainAudio,
  setRainIntensity,
  stopRainAudio,
  isAudioInitialized,
} from "@/lib/studioAudio";
import {
  playLampClick,
  playDayNightSound,
  playNavBlip,
} from "@/lib/soundEffects";

export type MonitorDisplayMode = "code" | "terminal" | "architecture";

interface StudioContextType {
  isNightMode: boolean;
  toggleNightMode: () => void;
  isLampOn: boolean;
  toggleLamp: () => void;
  isAudioOn: boolean;
  toggleAudio: () => void;
  isFocusMode: boolean;
  toggleFocusMode: () => void;
  monitorMode: MonitorDisplayMode;
  cycleMonitorMode: () => void;
  setMonitorMode: (mode: MonitorDisplayMode) => void;
}

const StudioContext = createContext<StudioContextType | null>(null);

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const [isNightMode, setIsNightMode] = useState(false);
  const [isLampOn, setIsLampOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [monitorMode, setMonitorMode] = useState<MonitorDisplayMode>("code");

  const toggleNightMode = useCallback(() => {
    setIsNightMode((prev) => {
      const next = !prev;
      playDayNightSound(next);
      return next;
    });
  }, []);

  const toggleLamp = useCallback(() => {
    playLampClick();
    setIsLampOn((prev) => !prev);
  }, []);

  const toggleFocusMode = useCallback(() => {
    setIsFocusMode((prev) => !prev);
  }, []);

  const toggleAudio = useCallback(() => {
    setIsAudioOn((prev) => {
      const next = !prev;
      if (next) {
        if (!isAudioInitialized()) {
          initRainAudio();
        } else {
          unmuteRainAudio(isNightMode ? "night" : "day");
        }
        setRainIntensity(isNightMode ? "night" : "day");
      } else {
        muteRainAudio();
      }
      return next;
    });
  }, [isNightMode]);

  // Synchronise rain intensity when day/night switches
  useEffect(() => {
    if (isAudioOn && isAudioInitialized()) {
      setRainIntensity(isNightMode ? "night" : "day");
    }
  }, [isNightMode, isAudioOn]);

  useEffect(() => {
    return () => {
      stopRainAudio();
    };
  }, []);

  const cycleMonitorMode = useCallback(() => {
    setMonitorMode((prev) => {
      if (prev === "code") return "terminal";
      if (prev === "terminal") return "architecture";
      return "code";
    });
  }, []);

  // Keyboard navigation listener (keys 1-4, N, L, A, F)
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
        playNavBlip();
        scrollToFraction(0.0);
      } else if (e.key === "2") {
        e.preventDefault();
        playNavBlip();
        scrollToFraction(0.42);
      } else if (e.key === "3") {
        e.preventDefault();
        playNavBlip();
        scrollToFraction(0.74);
      } else if (e.key === "4") {
        e.preventDefault();
        playNavBlip();
        scrollToFraction(0.95);
      } else if (e.key.toLowerCase() === "n") {
        // Toggle Day / Night mode with 'N'
        e.preventDefault();
        toggleNightMode();
      } else if (e.key.toLowerCase() === "l") {
        // Toggle Desk Lamp with 'L'
        e.preventDefault();
        toggleLamp();
      } else if (e.key.toLowerCase() === "a") {
        // Toggle Ambient Rain Audio with 'A'
        e.preventDefault();
        toggleAudio();
      } else if (e.key.toLowerCase() === "f") {
        // Toggle Focus / Zen Mode with 'F'
        e.preventDefault();
        toggleFocusMode();
      } else if (e.key === "Escape" && isFocusMode) {
        e.preventDefault();
        setIsFocusMode(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleNightMode, toggleLamp, toggleAudio, toggleFocusMode, isFocusMode]);

  return (
    <StudioContext.Provider
      value={{
        isNightMode,
        toggleNightMode,
        isLampOn,
        toggleLamp,
        isAudioOn,
        toggleAudio,
        isFocusMode,
        toggleFocusMode,
        monitorMode,
        cycleMonitorMode,
        setMonitorMode,
      }}
    >
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
