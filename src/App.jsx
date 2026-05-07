import { NativeRouter, Route, Routes } from "react-router-native";
import BreakPage from "./pages/BreakPage";
import FocusPage from "./pages/FocusPage";
import TodoPage from "./pages/TodoPage";

export default function App() {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/" element={<FocusPage />} />
        <Route path="/focus" element={<FocusPage />} />
        <Route path="/break" element={<BreakPage />} />
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </NativeRouter>
  );
}
