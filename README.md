# 🐸 FROGI – Cozy Pomodoro App

FROGI is a cute and cozy Pomodoro-style productivity app built with React Native and Expo.

It combines:
- ⏳ Focus & break timers
- 🎵 Built-in lofi music picker
- 🐸 Animated frog reactions
- 📝 Persistent to-do list

The app was designed to make productivity feel fun, calm, and a little chaotic in the best way possible.

---
## ✨ Features

### ⏳ Pomodoro Timer
- 25-minute focus sessions
- 5-minute break sessions
- Swipe horizontally between modes
- Timer completion sound effects

### 🐸 Animated Frog Modes
- Focus frog types aggressively while on fire 🔥
- Break frog destroys the laptop with a racket 💥
- Dancing frog appears while music is playing 🎶

### 🎵 Lofi Music Picker
- Pick from multiple lofi tracks
- Music keeps playing while navigating the app
- Hidden frog easter egg in the corner

### 📝 To-Do List
- Add tasks
- Mark tasks as completed
- Delete tasks
- Tasks persist while navigating
---

## Tech stack

- **React Native** 
- **Expo** (SDK 54) 
- **expo-av**
  
![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white) ![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

The app also uses **react-router-native** for routing, **react-native-reanimated** for route transitions, and a built-in **ScrollView** for the focus/break pager.


## 📂 Project Structure

```bash
src/
├── assets/        # gifs, sounds, images
├── components/    # reusable UI components
├── context/       # audio + todo state management
├── pages/         # focus, break, todo pages
└── screens/       # swipe timer screen
```

## Run the project

```bash
npm install
npx expo start
```

Open the project in **Expo Go** or a simulator from the Metro UI. If bundling acts stale after changes:

```bash
npx expo start --clear
```

## 💚 Inspiration

I wanted to create a productivity app that felt less stressful and more comforting.

Instead of a minimal corporate timer, I made something playful with frogs, music, soft colors, and small interactions that make studying feel lighter.
