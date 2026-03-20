# CLAUDE.md

## Project

Personal fitness coaching web app for 김사인. Organizes 24 PT sessions with trainer 김동건 (Dec 2025 – Mar 2026). Deployed to Vercel via `kimsain/exercise_dev`.

## Commands

```bash
npm run dev      # dev server at localhost:3000
npm run build    # production build — run before pushing
npm run start    # production server locally
npx tsc --noEmit # type-check without building
```

## Tech Stack

- **Next.js 16** (App Router, no `output: 'export'`)
- **Tailwind CSS v4** — config via `src/app/globals.css` `@theme` block (no `tailwind.config.ts`)
- **TypeScript** — strict mode
- **No database** — all content is hardcoded TypeScript data files

## Architecture

```
src/
  app/           # Routes: /, /exercises/[slug], /sessions/[id], /health, /principles, /stretching
  components/    # Navigation, HealthChip, ExerciseCard, FilterChips, FormCueList, SearchBar
  data/          # exercises.ts (~28 items), sessions.ts (24), health-profile.ts, principles.ts
  lib/types.ts   # TypeScript interfaces: Exercise, Session, HealthProfile, Principle
```

## Key Patterns

- **Data updates**: Edit files in `src/data/` directly — no database, no CMS
- **Adding exercises**: Add to `exercises.ts`, add slug to relevant sessions in `sessions.ts`
- **New routes**: Create `src/app/[route]/page.tsx` — server components by default
- **Client components**: Need `'use client'` at top (FilterChips, SearchBar, Navigation, WakeLock)

## Health Context (Critical)

User has GFR 45-50 (reduced kidney function). Any suggestions touching exercise intensity or nutrition must respect:
- 횡문근융해증 절대 금지 (rhabdomyolysis strictly prohibited)
- 분말 보충제 금지 (no powder supplements)
- 기립성 저혈압 (orthostatic hypotension — exercise order matters: floor → seated → standing)

## Gotchas

- **Tailwind v4**: No `tailwind.config.ts`. Font and theme config is in `globals.css` `@theme` block
- **React/JSX types**: LSP may show false TypeScript errors about `@types/react` — `npm run build` is the authoritative check
- **Session 22**: Contains only a scheduling message (no exercise content) — `exercises: []` is correct
- **6+ truncated sessions**: Trainer messages cut off mid-sentence by KakaoTalk export — `isIncomplete: true` flags these
