import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigate } from "react-router-native";
import AddTaskInput from "../components/AddTaskInput";
import TaskItem from "../components/TaskItem";
import { useTodo } from "../context/TodoContext";

export default function TodoPage() {
  const navigate = useNavigate();
  const { tasks, addTask, toggleTask, deleteTask } = useTodo();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.card}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>TO-DO LIST</Text>
          <Image
            source={require("../assets/images/frog-three.gif")}
            style={styles.frogImage}
            resizeMode="contain"
          />

          <View style={styles.list}>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </View>

          <AddTaskInput onAdd={addTask} />
        </ScrollView>

        <View style={styles.modeRow}>
          <Pressable
            style={({ pressed }) => [styles.modeButton, pressed && styles.pressed]}
            onPress={() => navigate("/focus")}
          >
            <Text style={styles.modeText}>FOCUS</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.modeButton, pressed && styles.pressed]}
            onPress={() => navigate("/break")}
          >
            <Text style={styles.modeText}>BREAK</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#EBE9AF",
    paddingHorizontal: 20,
    paddingTop: 26,
    paddingBottom: 24,
  },
  card: {
    height: '88%',
    marginTop: 24,  
    backgroundColor: "#F6F6F6",
    borderRadius: 12,
    marginHorizontal: 16,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
    overflow: "hidden",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 2,
    paddingBottom: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "700",
    color: "#111111",
    marginBottom: -16,
  },
  frogImage: {
    width: 140,
    height: 140,
    alignSelf: "center",
    marginBottom: 1,
  },
  list: {
    marginBottom: 8,
  },
  modeRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    paddingTop: 10,
    paddingBottom: 8,
  },
  modeButton: {
    minWidth: 92,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#EBE9AF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  modeText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
});
