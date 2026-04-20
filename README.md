# CS2 Match Tracker

A full-stack web application for tracking Counter-Strike 2 match history, performance stats, and career progression.

Built as a capstone project during a software engineering internship at OpsWerks.

---

## Tech stack

**Frontend**
- Next.js 15 (App Router)
- TypeScript
- CSS Modules
- js-cookie

**Backend**
- Django + Django REST Framework
- PostgreSQL
- SimpleJWT (JWT authentication)
- django-filter
- Docker + Docker Compose

---

## Features

- JWT authentication — register, login, logout with token-based sessions
- Dashboard — career overview showing total matches, win rate, K/D ratio, and win rate by map
- Match history — paginated list of all matches with map and result filters
- Match detail — per-match stats including kills, deaths, assists, MVP rounds, and score
- Add match — log new matches with map, result, and score
- Add match stats — log performance stats for any match
- Edit profile — update username, email, rank, and password
- Protected routes — unauthenticated users are redirected to login via Next.js middleware

---

## Getting started

### Prerequisites

- Node.js 18+
- pnpm
- Django backend running on `http://127.0.0.1:8000`

### Installation

```bash
# clone the repo
git clone <repo-url>
cd cs2-tracker-frontend

# install dependencies
pnpm install

# set up environment variables
cp .env.example .env.local
# edit .env.local and set NEXT_PUBLIC_API_URL
```

### Environment variables

Create a `.env.local` file in the project root:
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000

### Running the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## API endpoints used

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login/` | Login — returns access and refresh tokens |
| POST | `/api/auth/register/` | Register new user |
| GET | `/api/users/me/` | Get current user profile |
| PUT / PATCH | `/api/users/me/` | Update user profile |
| GET | `/api/user-stats-summary/:id/` | Get career stats aggregates |
| GET | `/api/user-matches/` | List matches (paginated, filterable) |
| POST | `/api/user-matches/` | Create a new match |
| GET | `/api/user-matches/:id/` | Get match detail with stats |
| DELETE | `/api/user-matches/:id/` | Delete a match |
| POST | `/api/match-stats/` | Add stats for a match |
| GET | `/api/maps/` | List all available maps |

## Key concepts


### Next.js
- **App Router** — file-based routing where every `page.tsx` inside `app/` becomes a route automatically. Folders with parentheses like `(auth)` and `(dashboard)` are route groups that share layouts without adding a URL segment
- **Middleware** — runs on the server edge before any page loads, used here for route protection by checking for a valid token cookie and redirecting unauthenticated users to login
- **Route groups and layouts** — `(auth)` and `(dashboard)` each have their own `layout.tsx`, so pages inside them share a common shell without repeating code
- **`loading.tsx` and `error.tsx`** — Next.js conventions that automatically wrap pages in Suspense and error boundaries, showing a loading spinner or error message without any manual setup
- **CSS Modules** — component-scoped styles using `.module.css` files. Class names are locally scoped so `.card` in one component never conflicts with `.card` in another
- **Environment variables** — `NEXT_PUBLIC_` prefix exposes variables to the browser. Variables without the prefix are server-only

### React
- **`useState`** — declares reactive local state inside a component. When state changes, the component re-renders with the new value. Used throughout for loading flags, form errors, fetched data, and modal visibility
- **`useEffect`** — runs side effects after render. The dependency array controls when it re-runs: `[]` means once on mount, `[value]` means every time `value` changes. Used for all API fetches and auth initialization
- **`useCallback`** — memoizes a function so it is not recreated on every render. Used for `fetchMatches` so it can safely be listed as a `useEffect` dependency without causing infinite loops
- **`useContext`** — reads from a React context without prop drilling. Used via the `useAuth()` hook to access the current user and auth actions from any component in the tree
- **`createContext` and Context API** — creates a global state container. `AuthContext` holds the logged-in user, login, logout, and updateUser. The `AuthProvider` wraps the entire app and any component can read from it using `useAuth()`
- **Component composition** — pages own state and fetch data, then pass it down to presentational components as props. `DashboardPage` fetches career stats and passes them to `CareerOverviewComponent` and `WinRateByMap`. Components stay focused and reusable
- **Props and prop types** — every component declares a `type Props` to define what data it expects. TypeScript enforces this at compile time so mismatches are caught before the app runs
- **Conditional rendering** — `{!hasStats ? <AddStatsForm /> : <StatsTable />}` pattern used throughout to show different UI based on data state
- **Event handling** — `React.FormEvent<HTMLFormElement>` types form submissions, `React.ChangeEvent<HTMLInputElement>` types input changes. Always typed so TypeScript knows what properties are available on the event