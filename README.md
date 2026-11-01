# Star Wars Explorer

A Master-Detail web app for browsing the characters of the Star Wars saga. It is the final project for course 4255 (Advanced Web Development Platforms and AI).

## What the app does

| Page | URL | What you can do |
|---|---|---|
| Characters | `/` | Browse every character as a card and filter the list by name as you type. The search ignores upper and lower case. |
| Character details | `/items/:id` | See height, mass, birth year, gender, and eye, hair and skin colour. The page also shows the name of the character's homeworld and their films, sorted by episode. |
| My Favorites | `/favorites` | Star characters from the list or the detail page. Favorites are saved in `localStorage`, so they are still there after a refresh. |
| Head to Head | `/compare` | Pick two characters and compare their height, mass and number of films side by side. The higher value in each row is highlighted, along with the difference. |
| 404 | any other URL | Shows "Page not found" and a link back home. |

Every page that loads data shows one of three states: loading, error or data. Missing values (`"unknown"`) are shown as "Unknown". The layout is responsive down to a 375px phone screen.

## Data source: SWAPI

All data comes from **SWAPI, the Star Wars API**, at [`https://swapi.info/api`](https://swapi.info/api). The API is free and needs no key.

| Endpoint | Used for |
|---|---|
| `/people` | The full character list. It is fetched once and shared by the list and compare pages. |
| `/people/:id` | A single character, on the detail page. |
| `/planets/:id` | The homeworld name. It is fetched together with the films, using `Promise.all`. |
| `/films/:id` | Film titles and episode numbers. |

SWAPI has no `id` field, so the app takes the id from the end of each `url`. All values are strings (`"1,358"`, `"unknown"`), and the app converts them to numbers where it needs to compare them.

## Tech stack

- React 19, TypeScript and Vite
- React Router, for client-side routing
- `fetch` inside `useEffect`, with no data-fetching library
- `useState` and props for state, with no Redux
- Plain CSS, with no UI library
- Vitest and Vitest UI, for unit tests

## Getting started

You need [Node.js](https://nodejs.org/) 20 or newer.

```bash
npm install     # install dependencies
npm run dev     # start the dev server, then open the URL it prints (usually http://localhost:5173)
```

Other scripts:

```bash
npm run build   # type-check and build for production into dist/
npm run preview # serve the production build locally
npm run lint    # run oxlint
```

## Running the tests

```bash
npm run test     # run all tests once in the terminal
npm run test:ui  # open the Vitest UI in the browser
```

The tests are in `src/utils/helpers.test.ts`. They cover the app's pure logic:

- `getIdFromUrl`: takes the id from a SWAPI url
- `parseMeasurement`: turns `"1,358"` into 1358 and `"unknown"` into `null`
- `filterCharacters`: search that ignores case and surrounding spaces
- `toggleFavorite`: adds and removes favorites without duplicates
- `compareStat`: picks the winner and the difference, and returns no winner when a value is missing

## Project structure

```
src/
├── components/   # CharacterList, CharacterSelect, CompareTable, FavoriteButton,
│                 # Navbar, SearchBar, StatusMessage
├── hooks/        # useCharacters: fetches /people once for the whole app
├── pages/        # ListPage, DetailPage, FavoritesPage, ComparePage, NotFoundPage
├── types/        # Character, SwapiCharacter, Planet, Film and the shared prop types
├── utils/        # pure helper functions and their tests, plus localStorage access
├── App.tsx       # routes, the shared character list and favorites state
└── index.css     # the dark Star Wars theme and responsive layout
```

The product spec is in [`PRD.md`](PRD.md), and the step-by-step build plan is in [`tasks.md`](tasks.md).
