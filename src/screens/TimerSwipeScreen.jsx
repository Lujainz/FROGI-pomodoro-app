import { useLayoutEffect, useRef } from "react";
import { ScrollView, useWindowDimensions, View } from "react-native";
import { useLocation, useNavigate } from "react-router-native";
import SongPicker from "../components/SongPicker";
import BreakPage from "../pages/BreakPage";
import FocusPage from "../pages/FocusPage";

export default function TimerSwipeScreen() {
  const { width } = useWindowDimensions();
  const scrollRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  useLayoutEffect(() => {
    const x = pathname === "/break" ? width : 0;
    scrollRef.current?.scrollTo({ x, y: 0, animated: false });
  }, [pathname, width]);

  const onMomentumScrollEnd = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / width);
    if (page <= 0) {
      navigate("/focus");
    } else {
      navigate("/break");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SongPicker />
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onMomentumScrollEnd={onMomentumScrollEnd}
        style={{ flex: 1 }}
      >
        <View style={{ width, flex: 1 }}>
          <FocusPage />
        </View>
        <View style={{ width, flex: 1 }}>
          <BreakPage />
        </View>
      </ScrollView>
    </View>
  );
}
