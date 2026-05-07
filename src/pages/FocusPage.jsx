import { Audio } from "expo-av";
import { useEffect, useMemo, useRef, useState } from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useNavigate } from "react-router-native";
import { useAudio } from "../context/AudioContext";

async function playDingOnce() {
  const { sound } = await Audio.Sound.createAsync(require("../assets/sounds/ding.mp3"), {
    shouldPlay: true,
  });
  sound.setOnPlaybackStatusUpdate((status) => {
    if (status.isLoaded && status.didJustFinish) {
      sound.unloadAsync();
    }
  });
}

export default function FocusPage() {
  const navigate = useNavigate();
  const defaultSeconds = 25 * 60;
  const [secondsLeft, setSecondsLeft] = useState(defaultSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const { isDancing, toggleDancing } = useAudio();

  const prevSecondsLeftRef = useRef(null);

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (
      prevSecondsLeftRef.current !== null &&
      prevSecondsLeftRef.current > 0 &&
      secondsLeft === 0
    ) {
      void playDingOnce().catch(() => {});
    }
    prevSecondsLeftRef.current = secondsLeft;
  }, [secondsLeft]);

  useEffect(() => {
    if (!isRunning) return undefined;
    if (secondsLeft <= 0) {
      setIsRunning(false);
      return undefined;
    }

    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning, secondsLeft]);

  const displayTime = useMemo(() => {
    const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
    const seconds = String(secondsLeft % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [secondsLeft]);

  const toggleTimer = () => setIsRunning((prev) => !prev);
  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(defaultSeconds);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Pressable style={({ pressed }) => [styles.todoShortcut, pressed && styles.pressed]} onPress={() => navigate("/todo")}>
        <Text style={styles.todoText}>📝</Text>
      </Pressable>

      <View style={styles.card}>
        <Image source={require("../assets/images/frog-one.gif")} style={styles.frogImage} resizeMode="contain" />

        <View style={styles.modeRow}>
          <Pressable style={({ pressed }) => [styles.pillButton, pressed && styles.pressed]} onPress={() => navigate("/focus")}>
            <Text style={styles.pillText}>FOCUS</Text>
          </Pressable>
          <Pressable style={({ pressed }) => [styles.pillButton, pressed && styles.pressed]} onPress={() => navigate("/break")}>
            <Text style={styles.pillText}>BREAK</Text>
          </Pressable>
        </View>

        <Text style={styles.message}>You can do it!!</Text>
        <Text style={styles.timerText}>{displayTime}</Text>

        <View style={styles.actionRow}>
          <Pressable style={({ pressed }) => [styles.pillButton, styles.startButton, pressed && styles.pressed]} onPress={toggleTimer}>
            <Text style={styles.pillText}>{isRunning ? "PAUSE" : "START"}</Text>
          </Pressable>
          <Pressable style={({ pressed }) => [styles.resetButton, pressed && styles.pressed]} onPress={resetTimer}>
            <Text style={styles.resetText}>↻</Text>
          </Pressable>
        </View>

        <Pressable
          style={({ pressed }) => [styles.cornerFrogHit, pressed && styles.pressed]}
          onPress={() => void toggleDancing()}
        >
          <Image
            source={
              isDancing
                ? require("../assets/images/dance.gif")
                : require("../assets/images/sound.gif")
            }
            style={styles.cornerFrog}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FF839B",
    paddingHorizontal: 20,
    paddingTop: 26,
    paddingBottom: 24,
  },
  todoShortcut: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    marginLeft: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  todoText: { fontSize: 25 },
  card: {
    position: "relative",
    height: '78%',
    backgroundColor: "#F6F6F6",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  frogImage: { width: 190, height: 190, marginBottom: 18 },
  modeRow: { flexDirection: "row", gap: 16, marginBottom: 14 },
  actionRow: { flexDirection: "row", gap: 16, marginTop: 14 },
  pillButton: {
    minWidth: 92,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FF839B",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  startButton: { minWidth: 96 },
  pillText: { color: "#000000", fontSize: 18, fontWeight: "600" },
  message: { color: "#666666", fontSize: 20, marginBottom: 6 },
  timerText: { color: "#000000", fontSize: 58, fontWeight: "700" },
  resetButton: {
    width: 56,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FF839B",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  resetText: { color: "#000000", fontSize: 26, fontWeight: "600" },
  pressed: { opacity: 0.85, transform: [{ scale: 0.97 }] },

  cornerFrogHit: {
    position: "absolute",
    bottom: -20,
    right: -12,
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },

  cornerFrog: {
    width: 120,
    height: 120,
  },
});
