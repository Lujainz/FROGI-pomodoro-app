import { Pressable, StyleSheet, Text, View } from "react-native";

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <View style={styles.row}>
      <Pressable style={({ pressed }) => [styles.checkbox, task.completed && styles.checkboxChecked, pressed && styles.pressed]} onPress={() => onToggle(task.id)}>
        {task.completed ? <Text style={styles.checkmark}>✓</Text> : null}
      </Pressable>

      <Text style={[styles.text, task.completed && styles.completedText]}>{task.text}</Text>

      <Pressable style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]} onPress={() => onDelete(task.id)}>
        <Text style={styles.deleteText}>x</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#222222",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#EBE9AF",
  },
  checkmark: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 16,
  },
  text: {
    flex: 1,
    color: "#111111",
    fontSize: 18,
  },
  completedText: {
    color: "#777777",
    textDecorationLine: "line-through",
  },
  deleteButton: {
    width: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteText: {
    color: "#222222",
    fontSize: 18,
    lineHeight: 22,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
});

