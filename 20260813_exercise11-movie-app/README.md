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
### Testa At the Movies genom att:<br>
Installerad programvara som krävs för att prova är:
```
Visual Studio 2026 – komplett IDE för Windows.
Node
```
Hämta repot med:
```
 git clone https://github.com/KarlqvistLars/FrontEndReactExercises.git
```
Gå sedan till:
```
.../FrontEndReactExercises/20260813_exercise11-movie-app/exercise11-movie-app
```
Kör:
```
npm install
```
Starta med:
```
npm run dev -- --host 4000
```
Starta ytterligare en terminal från:
```
.../FrontEndReactExercises/20260813_exercise11-movie-app/MovieAPI/API
```
och kör api't med: 
```
dotnet run
```
Gå till sidan genom öppna en browser på:
```
localhost:<porten där vite körs>
```
<br/>

[<<< TILLBAKA](https://github.com/KarlqvistLars/FrontEndReactExercises/blob/main/README.md)

