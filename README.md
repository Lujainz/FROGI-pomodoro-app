# FocusTimer

FocusTimer is a React Native Pomodoro app built with Expo. It includes a 25-minute focus timer, a 5-minute break timer, and a to-do list screen, with animated frog visuals and audio effects.

## Pages

- `/` and `/focus` → `FocusPage`: 25:00 timer with start/pause/reset, ding on completion, and an easter-egg frog music toggle.
- `/break` → `BreakPage`: 5:00 break timer with the same controls/behavior and break-themed visuals.
- `/todo` → `TodoPage`: interactive to-do list with add, check/uncheck, and delete actions, plus navigation back to Focus/Break.

## Tech stack

- React Native
- Expo (SDK 54)
- expo-av
- react-router-native
- react-native-reanimated

## Contexts

- `src/context/AudioContext.jsx`
  - Manages global easter-egg audio state.
  - Stores `isDancing` and exposes `toggleDancing()` so music persists across page switches.
- `src/context/TodoContext.jsx`
  - Manages global todo list state and actions.
  - Exposes `tasks`, `addTask`, `toggleTask`, and `deleteTask`.

## Folder structure (current)

```text
FocusTimer/
├── .vscode/
│   ├── extensions.json
│   └── settings.json
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
│   │       └── lofi3.mp3
│   ├── components/
│   │   ├── AddTaskInput.jsx
│   │   └── TaskItem.jsx
│   ├── context/
│   │   ├── AudioContext.jsx
│   │   ├── TimerContext.jsx
│   │   └── TodoContext.jsx
│   └── pages/
│       ├── BreakPage.jsx
│       ├── FocusPage.jsx
│       └── TodoPage.jsx
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

- `frog-one.gif` (Focus page main frog)
- `frog-two.gif` (Break page main frog)
- `frog-three.gif` (Todo page frog under title)
- `sound.gif` (corner easter-egg idle frog)
- `dance.gif` (corner easter-egg active frog)

### Sounds (`src/assets/sounds/`)

- `ding.mp3` (played when timer reaches 00:00)
- `lofi3.mp3` (loops while easter-egg frog is active)

## Run the project

```bash
npm install
npx expo start
```
