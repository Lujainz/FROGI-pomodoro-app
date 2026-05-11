import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Route, Routes, useLocation } from "react-router-native";
import { NativeRouter } from "react-router-native";
import { AudioProvider } from "./context/AudioContext";
import { TodoProvider } from "./context/TodoContext";
import TodoPage from "./pages/TodoPage";
import TimerSwipeScreen from "./screens/TimerSwipeScreen";

function AnimatedRoutes() {
  const location = useLocation();
  const routeKey = location.pathname === "/todo" ? location.pathname : "timer";

  return (
    <Animated.View
      key={routeKey}
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(300)}
      style={{ flex: 1 }}
    >
      <Routes location={location}>
        <Route path="/" element={<TimerSwipeScreen />} />
        <Route path="/focus" element={<TimerSwipeScreen />} />
        <Route path="/break" element={<TimerSwipeScreen />} />
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </Animated.View>
  );
}

export default function App() {
  return (
    <AudioProvider>
      <TodoProvider>
        <NativeRouter>
          <AnimatedRoutes />
        </NativeRouter>
      </TodoProvider>
    </AudioProvider>
  );
}
