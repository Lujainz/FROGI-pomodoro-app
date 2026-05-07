import { Audio } from "expo-av";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const [isDancing, setIsDancing] = useState(false);
  const lofiSoundRef = useRef(null);

  const toggleDancing = useCallback(async () => {
    if (isDancing) {
      const sound = lofiSoundRef.current;
      lofiSoundRef.current = null;
      setIsDancing(false);
      if (sound) {
        try {
          await sound.stopAsync();
          await sound.unloadAsync();
        } catch {
          /* ignore */
        }
      }
      return;
    }

    try {
      const { sound } = await Audio.Sound.createAsync(require("../assets/sounds/lofi3.mp3"), {
        shouldPlay: true,
        isLooping: true,
      });
      lofiSoundRef.current = sound;
      setIsDancing(true);
    } catch {
      /* ignore load errors */
    }
  }, [isDancing]);

  useEffect(() => {
    return () => {
      const sound = lofiSoundRef.current;
      if (sound) {
        sound.unloadAsync().catch(() => {});
        lofiSoundRef.current = null;
      }
    };
  }, []);

  return (
    <AudioContext.Provider value={{ isDancing, toggleDancing }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
}

