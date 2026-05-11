import { Audio } from "expo-av";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export const songs = [
  { id: 1, emoji: "🧘", label: "lofi chill", file: require("../assets/sounds/lofi-chill.mp3") },
  { id: 2, emoji: "🌸", label: "lofi cozy", file: require("../assets/sounds/lofi-cozy.mp3") },
  { id: 3, emoji: "🎵", label: "lofi hip hop", file: require("../assets/sounds/lofi-hiphop.mp3") },
  { id: 4, emoji: "🌙", label: "lofi ambient", file: require("../assets/sounds/lofi-ambient.mp3") },
  { id: 5, emoji: "🎷", label: "lofi jazz", file: require("../assets/sounds/lofi-jazz.mp3") },
];

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const [isDancing, setIsDancing] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const lofiSoundRef = useRef(null);

  const openPicker = useCallback(() => {
    setShowPicker(true);
  }, []);

  const closePicker = useCallback(() => {
    setShowPicker(false);
  }, []);

  const stopMusic = useCallback(async () => {
    setShowPicker(false);
    const sound = lofiSoundRef.current;
    lofiSoundRef.current = null;
    setIsDancing(false);
    setSelectedSong(null);
    if (sound) {
      try {
        await sound.stopAsync();
        await sound.unloadAsync();
      } catch {
        /* ignore */
      }
    }
  }, []);

  const selectSong = useCallback(async (song) => {
    setShowPicker(false);
    const prev = lofiSoundRef.current;
    lofiSoundRef.current = null;
    if (prev) {
      try {
        await prev.stopAsync();
        await prev.unloadAsync();
      } catch {
        /* ignore */
      }
    }
    try {
      const { sound } = await Audio.Sound.createAsync(song.file, {
        shouldPlay: true,
        isLooping: true,
      });
      lofiSoundRef.current = sound;
      setSelectedSong(song);
      setIsDancing(true);
    } catch {
      /* ignore load errors */
    }
  }, []);

  useEffect(() => {
    return () => {
      const sound = lofiSoundRef.current;
      if (sound) {
        sound.unloadAsync().catch(() => {});
        lofiSoundRef.current = null;
      }
    };
  }, []);

  const value = useMemo(
    () => ({
      songs,
      isDancing,
      showPicker,
      selectedSong,
      openPicker,
      closePicker,
      selectSong,
      stopMusic,
    }),
    [isDancing, showPicker, selectedSong, openPicker, closePicker, selectSong, stopMusic]
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
}
