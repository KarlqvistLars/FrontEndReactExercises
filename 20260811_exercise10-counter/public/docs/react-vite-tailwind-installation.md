# Installera React, Vite och Tailwind CSS

Den här guiden använder **Tailwind CSS v4**, Vite och npm.

## 1. Skapa ett React-projekt

Med TypeScript:

```bash
npm create vite@latest mitt-projekt -- --template react-ts
cd mitt-projekt
npm install
```

Använd `react` i stället för `react-ts` om du vill använda JavaScript.

> Aktuella versioner av Vite kräver Node.js 20.19+ eller 22.12+.

## 2. Installera Tailwind CSS

```bash
npm install tailwindcss @tailwindcss/vite
```

## 3. Konfigurera Vite

Uppdatera `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

I ett JavaScript-projekt heter filen vanligtvis `vite.config.js`.

## 4. Importera Tailwind

Ersätt innehållet i `src/index.css` med:

```css
@import "tailwindcss";
```

Kontrollera att CSS-filen importeras i `src/main.tsx` eller `src/main.jsx`:

```ts
import "./index.css";
```

## 5. Testa installationen

Lägg exempelvis detta i `src/App.tsx`:

```tsx
export default function App() {
  return (
    <main className="min-h-screen bg-slate-950 p-10 text-white">
      <h1 className="text-4xl font-bold text-cyan-400">
        React + Vite + Tailwind
      </h1>
    </main>
  );
}
```

Starta utvecklingsservern:

```bash
npm run dev
```

Öppna därefter adressen som visas i terminalen.

## Viktigt om äldre guider

Kommandot `npx tailwindcss init -p`, filen `tailwind.config.js` och direktiven `@tailwind base`, `@tailwind components` och `@tailwind utilities` hör normalt till **Tailwind CSS v3**. För ett nytt projekt med Tailwind v4 används Vite-pluginen och `@import "tailwindcss";` enligt stegen ovan.

## Officiell dokumentation

- [Tailwind CSS med Vite](https://tailwindcss.com/docs/installation/using-vite)
- [Vite – Getting Started](https://vite.dev/guide/)
