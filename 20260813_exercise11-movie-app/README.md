# Övning 11 - Frontend MovieApp

Läs förutsättningarna [här.](https://github.com/KarlqvistLars/FrontEndReactExercises/blob/main/20260813_exercise11-movie-app/%C3%96vning%2011%20Movie%20App.pdf)

### [Testa At the Movies](#Testa-At-the-Movies-genom-att)

Skapa ett nytt vite/React project med:
```
npm create vite@latest my-app -- --template react-ts 
```

## Bygg enl. detta exempel på struktur

```text
src/
├── app/                  # App-konfiguration
│   ├── App.tsx
│   ├── router.tsx
│   └── providers.tsx
├── features/             # Självständiga funktioner/domäner
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api.ts
│   │   ├── types.ts
│   │   └── index.ts
│   └── checkout/
├── pages/                # Sidor och routes
├── components/           # Generella UI-komponenter
├── hooks/                # Generella hooks
├── lib/                  # Klienter och tredjepartsintegrationer
├── utils/                # Små, rena hjälpfunktioner
├── types/                # Globala typer
└── assets/               # Bilder, ikoner och typsnitt
```

### Testa At the Movies genom att:
```
Hämta repot med: git clone <Repo namn>
```
