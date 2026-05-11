# FocusTimer

FocusTimer is a React Native Pomodoro-style app built with Expo. It pairs a **25-minute focus** session and a **5-minute break** session in one horizontally swipeable timer experience, includes **timer completion sounds**, a **corner frog easter egg** with **pickable lofi tracks** that keep playing while you move around the app, and a **persistent to-do list**.

## Pages (routes)

| Route | What you see |
|-------|----------------|
| `/`, `/focus`, `/break` | **`TimerSwipeScreen`**: a paging horizontal strip with **`FocusPage`** (left) and **`BreakPage`** (right). Swipe left/right between focus and break; **FOCUS** / **BREAK** buttons navigate the same way as before. |
| `/todo` | **`TodoPage`**: to-do list with add, complete, and delete; tasks survive navigation thanks to **`TodoContext`**. |

## Tech stack

- **React Native**
- **Expo** (SDK 54)
- **expo-av**

The app also uses **react-router-native** for routing, **react-native-reanimated** for route transitions, and a built-in **ScrollView** for the focus/break pager.

## Contexts

### `src/context/AudioContext.jsx`

- **`songs`**: fixed list of five lofi tracks (`require` paths to mp3s) with emoji + label for the picker.
- **State**: `isDancing` (music on/off), `showPicker` (song modal visible), `selectedSong` (current track object or `null`).
- **API**: `openPicker`, `closePicker`, `selectSong(song)`, `stopMusic` — loads/stops/unloads **`expo-av`** `Sound` for the easter-egg music so it **persists across screens** (provider wraps the router).
- Corner frog: tap opens the picker when idle; tap again while playing **stops** music (does not reopen the picker).

### `src/context/TodoContext.jsx`

- Holds **`tasks`** and helpers **`addTask`**, **`toggleTask`**, **`deleteTask`** so the list does not reset when leaving **`TodoPage`**.

## Folder structure (current)

```text
FocusTimer/
├── .vscode/
│   ├── extensions.json
│   └── settings.json
├── assets/
│   └── images/
│       ├── android-icon-background.png
│       ├── android-icon-foreground.png
│       ├── android-icon-monochrome.png
│       ├── favicon.png
│       ├── icon.png
│       ├── partial-react-logo.png
│       ├── react-logo.png
│       ├── react-logo@2x.png
│       ├── react-logo@3x.png
│       └── splash-icon.png
├── src/
│   ├── App.jsx
│   ├── assets/
│   │   ├── images/
│   │   │   ├── dance.gif
│   │   │   ├── frog-one.gif
│   │   │   ├── frog-three.gif
│   │   │   ├── frog-two.gif
│   │   │   └── sound.gif
│   │   └── sounds/
│   │       ├── ding.mp3
│   │       ├── lofi3.mp3
│   │       ├── lofi-ambient.mp3
│   │       ├── lofi-chill.mp3
│   │       ├── lofi-cozy.mp3
│   │       ├── lofi-hiphop.mp3
│   │       └── lofi-jazz.mp3
│   ├── components/
│   │   ├── AddTaskInput.jsx
│   │   ├── SongPicker.jsx
│   │   └── TaskItem.jsx
│   ├── context/
│   │   ├── AudioContext.jsx
│   │   └── TodoContext.jsx
│   ├── pages/
│   │   ├── BreakPage.jsx
│   │   ├── FocusPage.jsx
│   │   └── TodoPage.jsx
│   └── screens/
│       └── TimerSwipeScreen.jsx
├── App.js
├── app.json
├── babel.config.js
├── eslint.config.js
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

## Assets needed

### GIFs (`src/assets/images/`)

| File | Use |
|------|-----|
| `frog-one.gif` | Focus screen hero |
| `frog-two.gif` | Break screen hero |
| `frog-three.gif` | Todo screen under title |
| `sound.gif` | Easter-egg frog (idle) |
| `dance.gif` | Easter-egg frog (while music plays) |

### Sounds (`src/assets/sounds/`)

| File | Use |
|------|-----|
| `ding.mp3` | Plays when focus or break timer hits **00:00** |
| `lofi-chill.mp3` | Picker track: lofi chill |
| `lofi-cozy.mp3` | Picker track: lofi cozy |
| `lofi-hiphop.mp3` | Picker track: lofi hip hop |
| `lofi-ambient.mp3` | Picker track: lofi ambient |
| `lofi-jazz.mp3` | Picker track: lofi jazz |
| `lofi3.mp3` | Present under `src/assets/sounds/` (not wired in current picker code) |

## Run the project

```bash
npm install
npx expo start
```

Open the project in **Expo Go** or a simulator from the Metro UI. If bundling acts stale after changes:

```bash
npx expo start --clear
```
