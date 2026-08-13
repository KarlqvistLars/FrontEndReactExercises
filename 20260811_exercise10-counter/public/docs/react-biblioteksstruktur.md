# Rekommenderad biblioteksstruktur i React

En bra utgångspunkt är att organisera projektet efter **funktion eller domän** i stället för enbart efter filtyp. Då hålls relaterad kod samlad och projektet blir enklare att skala.

## Exempel på struktur

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

## Viktiga principer

- Placera kod nära funktionen som använder den.
- Flytta bara kod till gemensamma mappar när den faktiskt återanvänds.
- Undvik stora globala mappar med många orelaterade filer.
- Skapa tydliga gränser mellan features, gärna med ett publikt API via `index.ts`.
- Placera tester nära koden, exempelvis `Button.test.tsx` bredvid `Button.tsx`.
- Börja enkelt och lägg till mappar först när projektet behöver dem.

## För mindre projekt

```text
src/
├── components/
├── pages/
├── hooks/
├── lib/
├── App.tsx
└── main.tsx
```

## Slutsats

Det finns ingen universell struktur, men en **feature-baserad struktur som får växa med projektet** är oftast den mest hållbara lösningen.
