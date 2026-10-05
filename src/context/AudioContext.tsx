"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

export interface AudioTrackInfo {
  id: string;
  title: string;
  artist: string;
  audioUrl?: string;
}

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  hasStarted: boolean;
  currentTrack: AudioTrackInfo;
  startAudio: () => Promise<void>;
  togglePlay: () => void;
  toggleMute: () => void;
  playTrack: (track: AudioTrackInfo) => void;
  audioLevels: number[];
}

const DEFAULT_TRACK: AudioTrackInfo = {
  id: "hero-anthem",
  title: "THE BEAT STARTS HERE (HYPNOSIS CUT)",
  artist: "HOB RESIDENTS",
  audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<AudioTrackInfo>(DEFAULT_TRACK);
  const [audioLevels, setAudioLevels] = useState<number[]>([0.3, 0.6, 0.4, 0.8, 0.5]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize Audio Element
    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audio.loop = true;
    audio.volume = 0.7;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Equalizer visualizer effect
  useEffect(() => {
    if (isPlaying && !isMuted) {
      const updateBars = () => {
        setAudioLevels([
          0.3 + Math.random() * 0.7,
          0.2 + Math.random() * 0.8,
          0.4 + Math.random() * 0.6,
          0.3 + Math.random() * 0.7,
          0.5 + Math.random() * 0.5
        ]);
        animFrameRef.current = requestAnimationFrame(updateBars);
      };
      animFrameRef.current = requestAnimationFrame(updateBars);
    } else {
      setAudioLevels([0.1, 0.1, 0.1, 0.1, 0.1]);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    }
  }, [isPlaying, isMuted]);

  const startAudio = async () => {
    if (!audioRef.current) return;
    try {
      if (!audioRef.current.src) {
        audioRef.current.src = currentTrack.audioUrl || DEFAULT_TRACK.audioUrl!;
      }
      await audioRef.current.play();
      setIsPlaying(true);
      setHasStarted(true);
    } catch (err) {
      console.warn("Audio autoplay blocked or failed, user interaction required:", err);
      setHasStarted(true);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const playTrack = (track: AudioTrackInfo) => {
    setCurrentTrack(track);
    if (!audioRef.current) return;
    audioRef.current.src = track.audioUrl || DEFAULT_TRACK.audioUrl!;
    audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        hasStarted,
        currentTrack,
        startAudio,
        togglePlay,
        toggleMute,
        playTrack,
        audioLevels
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return ctx;
}
