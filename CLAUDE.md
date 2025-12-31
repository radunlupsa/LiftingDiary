# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Create production build
npm run start    # Run production server
npm run lint     # Run ESLint
```

## Tech Stack

- **Framework:** Next.js 16.1.1 with App Router
- **Language:** TypeScript 5 (strict mode)
- **UI:** React 19.2.3 with React Server Components
- **Styling:** Tailwind CSS 4 via PostCSS plugin
- **Fonts:** Geist font family via next/font/google

## Architecture

This is a Next.js App Router project:

- `app/` - All routes, pages, and layouts (file-based routing)
- `app/layout.tsx` - Root layout with metadata and font configuration
- `app/globals.css` - Global styles with CSS variables for theming
- `public/` - Static assets served at root URL

### Path Aliases

`@/*` resolves to the project root (configured in tsconfig.json)

### Styling Pattern

Tailwind CSS 4 with theme variables defined in `globals.css`:
- Uses `@import "tailwindcss"` syntax
- Dark mode via `prefers-color-scheme` media query
- CSS variables: `--background`, `--foreground`, font families

## Project State

Fresh create-next-app installation ready for feature development. No testing framework, database, or CI/CD configured yet.
