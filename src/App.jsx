import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Route, Routes, useLocation } from "react-router-native";
import { NativeRouter } from "react-router-native";
import { AudioProvider } from "./context/AudioContext";
import { TodoProvider } from "./context/TodoContext";
import BreakPage from "./pages/BreakPage";
import FocusPage from "./pages/FocusPage";
import TodoPage from "./pages/TodoPage";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <Animated.View
      key={location.pathname}
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(300)}
      style={{ flex: 1 }}
    >
      <Routes location={location}>
        <Route path="/" element={<FocusPage />} />
        <Route path="/focus" element={<FocusPage />} />
        <Route path="/break" element={<BreakPage />} />
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
