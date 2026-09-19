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
  playBookFlip,
  playVinylDrop,
  playLaserClick,
} from "@/lib/soundEffects";
import { lofiAudio } from "@/lib/lofiAudio";

export type MonitorDisplayMode = "code" | "terminal" | "architecture";
export type StudioWeather = "rain" | "sunny" | "snow";

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
  isTerminalOpen: boolean;
  toggleTerminal: (open?: boolean) => void;
  isBooksModalOpen: boolean;
  toggleBooksModal: (open?: boolean) => void;
  isLofiPlaying: boolean;
  toggleLofi: (playing?: boolean) => void;
  weather: StudioWeather;
  cycleWeather: () => void;
  isLaserActive: boolean;
  toggleLaser: (active?: boolean) => void;
  laserTarget: [number, number, number] | null;
  setLaserTarget: (target: [number, number, number] | null) => void;
  yarnTarget: [number, number, number] | null;
  isYarnMoving: boolean;
  setYarnState: (target: [number, number, number] | null, isMoving: boolean) => void;
  isGyroActive: boolean;
  toggleGyro: () => Promise<boolean>;
  isMobileDockOpen: boolean;
  toggleMobileDock: (open?: boolean) => void;
}

const StudioContext = createContext<StudioContextType | null>(null);

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const [isNightMode, setIsNightMode] = useState(false);
  const [isLampOn, setIsLampOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [monitorMode, setMonitorMode] = useState<MonitorDisplayMode>("code");
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isBooksModalOpen, setIsBooksModalOpen] = useState(false);
  const [isLofiPlaying, setIsLofiPlaying] = useState(false);
  const [weather, setWeather] = useState<StudioWeather>("rain");
  const [isLaserActive, setIsLaserActive] = useState(false);
  const [laserTarget, setLaserTarget] = useState<[number, number, number] | null>(null);
  const [yarnTarget, setYarnTarget] = useState<[number, number, number] | null>([-0.85, 0.045, 1.25]);
  const [isYarnMoving, setIsYarnMoving] = useState(false);
  const [isGyroActive, setIsGyroActive] = useState(false);
  const [isMobileDockOpen, setIsMobileDockOpen] = useState(false);

  const toggleMobileDock = useCallback((open?: boolean) => {
    setIsMobileDockOpen((prev) => (typeof open === "boolean" ? open : !prev));
  }, []);

  const toggleGyro = useCallback(async () => {
    if (isGyroActive) {
      setIsGyroActive(false);
      return false;
    }

    // Check for iOS 13+ permission
    if (
      typeof window !== "undefined" &&
      typeof (DeviceOrientationEvent as any) !== "undefined" &&
      typeof (DeviceOrientationEvent as any).requestPermission === "function"
    ) {
      try {
        const res = await (DeviceOrientationEvent as any).requestPermission();
        if (res === "granted") {
          setIsGyroActive(true);
          return true;
        } else {
          setIsGyroActive(false);
          return false;
        }
      } catch (err) {
        console.warn("DeviceOrientation permission error:", err);
        setIsGyroActive(false);
        return false;
      }
    } else {
      // Android or browsers not requiring permission
      setIsGyroActive(true);
      return true;
    }
  }, [isGyroActive]);

  const setYarnState = useCallback((target: [number, number, number] | null, isMoving: boolean) => {
    setYarnTarget(target);
    setIsYarnMoving(isMoving);
  }, []);

  const toggleLaser = useCallback((active?: boolean) => {
    playLaserClick();
    setIsLaserActive((prev) => {
      const next = typeof active === "boolean" ? active : !prev;
      if (!next) {
        setLaserTarget(null);
      }
      return next;
    });
  }, []);

  const cycleWeather = useCallback(() => {
    playNavBlip();
    setWeather((prev) => {
      if (isNightMode) {
        // Night mode strictly supports Rain and Snow only
        return prev === "rain" ? "snow" : "rain";
      }
      if (prev === "rain") return "sunny";
      if (prev === "sunny") return "snow";
      return "rain";
    });
  }, [isNightMode]);

  const toggleNightMode = useCallback(() => {
    setIsNightMode((prev) => {
      const next = !prev;
      playDayNightSound(next);
      if (next) {
        // Entering Night Mode: ensure weather is strictly Rain or Snow
        setWeather((current) => (current === "sunny" ? "rain" : current));
      }
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

  const toggleTerminal = useCallback((open?: boolean) => {
    setIsTerminalOpen((prev) => (typeof open === "boolean" ? open : !prev));
  }, []);

  const toggleBooksModal = useCallback((open?: boolean) => {
    playBookFlip();
    setIsBooksModalOpen((prev) => (typeof open === "boolean" ? open : !prev));
  }, []);

  const toggleLofi = useCallback((playing?: boolean) => {
    setIsLofiPlaying((prev) => {
      const next = typeof playing === "boolean" ? playing : !prev;
      if (next) {
        playVinylDrop();
        lofiAudio.start();
      } else {
        lofiAudio.stop();
      }
      return next;
    });
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
      lofiAudio.stop();
    };
  }, []);

  const cycleMonitorMode = useCallback(() => {
    setMonitorMode((prev) => {
      if (prev === "code") return "terminal";
      if (prev === "terminal") return "architecture";
      return "code";
    });
  }, []);

  // Keyboard navigation listener (keys 1-4, N, L, A, F, B, M, `)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      const activeTag = document.activeElement?.tagName;
      if (activeTag === "INPUT" || activeTag === "TEXTAREA" || activeTag === "SELECT") {
        if (e.key === "Escape") {
          setIsTerminalOpen(false);
          setIsBooksModalOpen(false);
        }
        return;
      }

      const getMaxScroll = () =>
        Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);

      const scrollToFraction = (fraction: number) => {
        const targetY = fraction * getMaxScroll();
        window.scrollTo({ top: targetY, behavior: "smooth" });
      };

      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        toggleTerminal();
      } else if (e.key === "1") {
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
        e.preventDefault();
        toggleNightMode();
      } else if (e.key.toLowerCase() === "l") {
        e.preventDefault();
        toggleLamp();
      } else if (e.key.toLowerCase() === "a") {
        e.preventDefault();
        toggleAudio();
      } else if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        toggleFocusMode();
      } else if (e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggleBooksModal();
      } else if (e.key.toLowerCase() === "m") {
        e.preventDefault();
        toggleLofi();
      } else if (e.key.toLowerCase() === "w") {
        e.preventDefault();
        cycleWeather();
      } else if (e.key.toLowerCase() === "p") {
        e.preventDefault();
        toggleLaser();
      } else if (e.key === "Escape") {
        if (isTerminalOpen) {
          e.preventDefault();
          setIsTerminalOpen(false);
        } else if (isBooksModalOpen) {
          e.preventDefault();
          setIsBooksModalOpen(false);
        } else if (isFocusMode) {
          e.preventDefault();
          setIsFocusMode(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    toggleNightMode,
    toggleLamp,
    toggleAudio,
    toggleFocusMode,
    toggleTerminal,
    toggleBooksModal,
    toggleLofi,
    cycleWeather,
    toggleLaser,
    isFocusMode,
    isTerminalOpen,
    isBooksModalOpen,
  ]);

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
        isTerminalOpen,
        toggleTerminal,
        isBooksModalOpen,
        toggleBooksModal,
        isLofiPlaying,
        toggleLofi,
        weather,
        cycleWeather,
        isLaserActive,
        toggleLaser,
        laserTarget,
        setLaserTarget,
        yarnTarget,
        isYarnMoving,
        setYarnState,
        isGyroActive,
        toggleGyro,
        isMobileDockOpen,
        toggleMobileDock,
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

