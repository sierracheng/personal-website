# Sierra Cheng — Personal Website

A dark glassmorphism portfolio built with React 19, TypeScript, and Framer Motion. Frosted glass cards float over an atmospheric desert background with parallax depth and blush accent lighting.

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS v4, CSS custom properties |
| Animation | Framer Motion |
| State | Redux Toolkit |
| Backend | Node.js, Express.js |

## Project Structure

```
portfolio/
├── client/                  # React frontend
│   └── src/
│       ├── components/
│       │   ├── layout/      # Navbar
│       │   ├── sections/    # Hero, About, Experience, Projects, Contact
│       │   └── ui/          # CustomCursor, FloatingOrbs, etc.
│       ├── hooks/           # useMagneticCursor, useCounter, useScrollReveal
│       ├── store/           # Redux slices (ui, projects)
│       └── types/
└── server/                  # Express backend (contact form)
```

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install all dependencies
npm install
npm install --prefix client
npm install --prefix server

# Run both client and server
npm run dev
```

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:3001 |

## Design System

Colors are defined as CSS custom properties in `client/src/index.css`:

```css
--bg-deep:      #0d0c0b      /* near-black base */
--glass-bg:     rgba(255,255,255,0.06)  /* frosted tile */
--glass-border: rgba(255,255,255,0.13)  /* glass rim */
--fg:           rgba(255,255,255,0.92)  /* primary text */
--muted:        rgba(255,255,255,0.44)  /* secondary text */
--accent:       #e8b4bc      /* blush pink */
```

Reusable glass card styles are exposed via the `.glass` and `.glass-sm` utility classes.

## Scripts

```bash
npm run dev          # client + server concurrently
npm run dev:client   # client only
npm run dev:server   # server only
```
