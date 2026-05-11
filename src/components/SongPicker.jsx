import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useAudio } from "../context/AudioContext";

const PINK = "#FF839B";

export default function SongPicker() {
  const { showPicker, songs, closePicker, selectSong } = useAudio();

  return (
    <Modal visible={showPicker} transparent animationType="fade" onRequestClose={closePicker}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Pressable style={({ pressed }) => [styles.closeBtn, pressed && styles.pressed]} onPress={closePicker}>
            <Text style={styles.closeText}>×</Text>
          </Pressable>

          <View style={styles.list}>
            {songs.map((song) => (
              <Pressable
                key={song.id}
                style={({ pressed }) => [styles.row, pressed && styles.pressed]}
                onPress={() => void selectSong(song)}
              >
                <Text style={styles.emoji}>{song.emoji}</Text>
                <Text style={styles.label}>{song.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "80%",
    maxWidth: 300,
    marginTop: 140,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingTop: 44,
    paddingHorizontal: 18,
    paddingBottom: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 12,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  closeText: {
    color: "#000000",
    fontSize: 28,
    lineHeight: 30,
    fontWeight: "400",
  },
  list: {
    gap: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  emoji: {
    fontSize: 22,
    width: 36,
    textAlign: "center",
  },
  label: {
    flex: 1,
    textAlign: "center",
    color: "#111111",
    fontSize: 18,
    fontWeight: "500",
    textTransform: "lowercase",
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
});
