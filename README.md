# React Quiz App

> A small React quiz app (learn-by-building) built while learning **advanced `useReducer`** patterns.

This project is a learning exercise that demonstrates an opinionated quiz application built with React. The main focus of the project was to practice advanced `useReducer` usage: combining related pieces of state, defining action-driven transitions, and keeping the reducer pure while coordinating side effects with `useEffect`.

---

## Features

- Fetches quiz questions from a mock JSON API (via `json-server`).
- Full quiz flow: start → answer questions → next → finish → restart.
- Per-question timing (countdown timer) and auto-finish when time runs out.
- Scoring system with points per question and highscore tracking.
- Visual feedback for selected answers (correct / wrong styling).
- Progress bar showing current position and score.
- Components organized in a `components/` folder for clarity.

---

## Project structure

Below is the project structure (taken from the provided screenshot):

```
The-React-Quiz/
├── data/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── Error.js
│   │   ├── FinishScreen.js
│   │   ├── Footer.js
│   │   ├── Header.js
│   │   ├── Loader.js
│   │   ├── Main.js
│   │   ├── NextButton.js
│   │   ├── options.js
│   │   ├── Progress.js
│   │   ├── Question.js
│   │   ├── StartScreen.js
│   │   └── Timer.js
│   │
│   ├── App.js
│   ├── index.css
│   └── index.js
│
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

Notes:

- `data/` contains the `questions.json` file used by `json-server`.
- `components/` holds all presentational and small container components.
- `App.js` contains the main reducer, action handling and orchestration.

---

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/raghadislam/the-react-quiz.git
cd the-react-quiz
```

2. Install dependencies:

```bash
npm install
```

3. Start the mock API server:

```bash
npm run server
```

4. Run the React app:

```bash
npm start
```

4. Open the app in your browser at `http://localhost:3000` (and ensure the JSON server runs at port `4000`).

---

## How it works — `useReducer` and app flow

The app demonstrates several `useReducer` patterns and best practices:

- **Single source of truth:** `useReducer` manages a combined state object (`questions`, `status`, `index`, `answer`, `points`, `highscore`, `secondsRemaining`).
- **Action-driven updates:** State changes happen by dispatching plain action objects (`{ type: 'newAnswer', payload }`, `{ type: 'nextQuestion' }`, `{ type: 'tick' }`, etc.).
- **Pure reducer:** The reducer performs pure calculations and returns new state objects without side effects.
- **Side effects separated:** Data fetching and timer `setInterval` are handled with `useEffect` and dispatch actions to update state.
- **Derived values:** Derived values such as `maxPossiblePoints` and `numQuestions` are computed from the current state for rendering, not stored redundantly in state.

This structure helps when your app grows — adding more actions or more complex state transitions becomes easier and testable.
