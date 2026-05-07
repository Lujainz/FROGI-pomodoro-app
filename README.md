# FocusTimer

FocusTimer is a **Pomodoro-style focus app** built with Expo. The main screen gives you a 25-minute focus session with start, pause, and reset controls, plus navigation to break and todo flows as you build them out.

## Pages

| Route   | Component   | Purpose |
|--------|-------------|---------|
| `/` or `/focus` | **FocusPage** | Main focus timer (25:00 countdown), motivational copy, mode links, optional ding when the timer hits zero, and a small interactive frog easter egg with sound. |
| `/break` | **BreakPage** | Reserved for your **break** period between focus sessions (placeholder for now). |
| `/todo`  | **TodoPage**  | Reserved for a **todo / task list** and quick access from the focus screen (placeholder for now). |

## Tech stack

- **React** & **React Native** — UI and app logic
- **Expo** (SDK 54) — build, Metro bundler, Expo Go workflow
- **React Router** ([`react-router-native`](https://reactrouter.com/)) — navigation between Focus, Break, and Todo
- **expo-av** — sound effects (ding when timer completes) and background music for the frog easter egg

## How to run

From the project root:

```bash
npm install
```

```bash
npx expo start
```

Then open the project in **Expo Go** (QR code / dev menu), or press `i` / `a` for iOS Simulator / Android emulator if you have them configured.

If Metro behaves oddly after dependency changes:

```bash
npx expo start --clear
```

## Folder structure (overview)

```text
FocusTimer/
├── App.js                 # Entry: forwards to src/App.jsx
├── app.json               # Expo config (name, splash, plugins, …)
├── babel.config.js        # Babel preset (Expo)
├── assets/                # Expo template assets (icons, splash, favicon)
├── src/
│   ├── App.jsx           # Routes: focus, break, todo
│   ├── index.css         # Unused placeholder (web/global styles)
│   ├── pages/            # Screens: FocusPage, BreakPage, TodoPage
│   ├── components/       # Shared UI (TimerDisplay, MessageBanner, …)
│   ├── context/          # TimerContext (future shared timer state)
│   ├── assets/
│   │   ├── images/       # GIF illustrations used on FocusPage
│   │   └── sounds/       # MP3 assets referenced by expo-av
│   └── sounds/           # Duplicate copies if you keep files here too
├── components/, hooks/, …  # Legacy/template folders from Expo starter (may be unused)
├── package.json
└── README.md
```

Focus-related UI and routing live primarily under **`src/`**.

## Assets needed

Place media files where **`FocusPage.jsx`** expects them (`require(...)` paths):

### GIFs (`src/assets/images/`)

| File         | Role |
|--------------|------|
| `frog-one.gif` | Hero frog on the focus session screen |
| `sound.gif`    | Small frog icon (corner); tapping toggles “listening/dancing” mode |
| `dance.gif`    | Alternate gif shown while music plays |

### Sounds (`src/assets/sounds/`)

| File       | Role |
|------------|------|
| `ding.mp3`  | Short alert played once when the timer reaches **00:00** |
| `lofi3.mp3` | Background loop played while the corner frog is in “dancing/on” mode |

The bundle resolves **`require`** paths relative to the **`FocusPage.jsx`** imports (`src/pages`). Optionally duplicate/copy **`src/sounds/*.mp3`** into **`src/assets/sounds/`** if you maintain originals alongside **`assets/`**.
