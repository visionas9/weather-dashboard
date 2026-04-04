# 🌤️ Weather Dashboard

A personal weather dashboard built with **Next.js**, **TypeScript**, and the **OpenWeatherMap API** — live at [weather-dashboard-black-eight.vercel.app](https://weather-dashboard-black-eight.vercel.app).

---

## About This Project

This is a learning project built over several focused sessions as part of a self-taught frontend journey (roughly 9 months in). The goal wasn't to ship fast — it was to deeply understand the patterns behind real-world React applications: async data fetching, state management, component communication, and data transformation.

Every feature was built by reasoning through the problem first, writing plain English before code, and keeping a thinking log at each stage.

---

## Features

- 🔍 City search with geocoding (converts city names to coordinates)
- 🌡️ Current weather with temperature, humidity, wind, visibility, pressure, sunrise & sunset
- 📅 5-day forecast with 3-hour resolution, grouped by day and matched to the closest current time slot
- ❤️ Favorites bar — save cities to localStorage, click to switch between them
- 🌙 Clean dark UI with subtle animations

---

## Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **React Context** for global state
- **OpenWeatherMap API** — Geocoding API + Current Weather + 5-Day Forecast
- **Tailwind CSS**
- **Vercel** for deployment

---

## What I Focused On

The main learning goals for this project were things I genuinely struggled with before starting:

- **Async patterns** — understanding when data is ready, why `console.log` shows stale state, and how `useEffect` timing works
- **State management** — choosing React Context over prop drilling, structuring a provider, and knowing what lives where
- **Data transformation** — taking raw API data (40 forecast items) and shaping it into something useful using `reduce`, `map`, and `Object.values`
- **Component communication** — destructuring context correctly, avoiding null errors, and understanding the flow of data through a real app
- **AbortController** — cancelling stale fetch requests when the city changes
- **TypeScript** — typing state, interfaces, and context instead of relying on `any`

---

## Honest Struggles

- **`reduce`** was the hardest concept to click. Understanding that it collapses an array into one thing — and using it to both group forecast data by day AND find the closest time entry — took real effort.
- **Async timing with `useEffect`** — specifically why data isn't available immediately after a `setState` call, and why dependency arrays matter so much.
- **Breaking problems into smaller pieces** — knowing what to build next was sometimes harder than actually building it.
- **Starting resistance** — a tendency to over-think before writing anything. Writing plain English comments before code helped a lot.

---

## On Using AI for Styling

The UI was largely AI-assisted (Claude). This was a deliberate choice — not to skip learning, but to keep focus on the JavaScript and React fundamentals that were the actual point of this project. Tailwind class composition and design decisions are learnable anytime. Understanding async state flow, data transformation pipelines, and component architecture were the harder and more important things to get right first.

That said, the structure of the JSX, the logic inside components, and all the data wiring was written and understood hands-on.

---

_Built with a lot of rubber duck debugging, thinking logs, and way too many hours staring at `console.log("forecast:", forecast)`._
