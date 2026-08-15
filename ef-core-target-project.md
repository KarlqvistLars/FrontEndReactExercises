# EF Core – Varför är Core target project?

När du kör:

```powershell
Add-Migration Init
```

så använder Visual Studio två olika projekt:

1. **Default project (Target project)** – projektet där migrationen ska skapas.
2. **Startup project** – projektet som startas för att läsa `Program.cs`, dependency injection och konfiguration.

Om felmeddelandet säger:

```text
Your target project 'MovieApi.Core'
```

betyder det normalt att **Default project** i Package Manager Console är inställt på `MovieApi.Core`.

## Kontrollera detta

Öppna:

**Tools → NuGet Package Manager → Package Manager Console**

Längst upp i Package Manager Console finns en rullista, exempelvis:

```text
Package source: ...
Default project: MovieApi.Core
```

Om den står på `MovieApi.Core` blir `MovieApi.Core` target project när du kör `Add-Migration`.

Om din `DbContext` och dina migrations hör hemma i `MovieApi.Data`, byt istället till:

```text
Default project: MovieApi.Data
```

och kör sedan:

```powershell
Add-Migration Init
```

## Startup Project vs Target Project

| Projektroll | Funktion | Vanligt projekt |
|---|---|---|
| **Startup Project** | Kör `Program.cs` och laddar DI, konfiguration och connection strings. | `MovieApi.API` |
| **Target / Default Project** | Projektet där migrationsfilerna skapas. | `MovieApi.Data` |

En vanlig konfiguration är därför:

- **Startup Project:** `MovieApi.API`
- **Default/Target Project:** `MovieApi.Data`

Det är alltså inte EF Core som automatiskt bestämmer att `Core` ska vara target project. I det här fallet är det Package Manager Consoles val av **Default project** som gör att `MovieApi.Core` används som target.
