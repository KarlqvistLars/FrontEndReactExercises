# EF Core -- Target project, migrations assembly och `Add-Migration`

## Fråga: Vad betyder detta fel?

Kommando:

``` powershell
PM> Add-Migration Init
```

Felmeddelande:

``` text
Build started...
Build succeeded.
Your target project 'MovieApi.Core' doesn't match your migrations assembly 'MovieApi.Data'. Either change your target project or change your migrations assembly.
Change your migrations assembly by using DbContextOptionsBuilder. E.g. options.UseSqlServer(connection, b => b.MigrationsAssembly("MovieApi.Core")). By default, the migrations assembly is the assembly containing the DbContext.
Change your target project to the migrations project by using the Package Manager Console's Default project drop-down list, or by executing "dotnet ef" from the directory containing the migrations project.
```

### Svar

Det här felet betyder att **Entity Framework försöker skapa migrationen
i ett annat projekt än där din `DbContext` och migrations är
konfigurerade**.

I ditt fall:

-   **Target project:** `MovieApi.Core`
-   **Migrations assembly:** `MovieApi.Data`

EF Core säger alltså i praktiken:

> Jag ska lägga migrationen i `MovieApi.Core`, men `DbContext` säger att
> migrationerna hör hemma i `MovieApi.Data`.

Lösningen kan exempelvis vara uppdelad så här:

``` text
MovieApi.API      <-- Startup (Program.cs)
MovieApi.Core     <-- Entities, interfaces
MovieApi.Data     <-- DbContext
MovieApi.Services <-- Services
```

Om `MovieApi.Data` innehåller `MovieApiContext` är det också där
migrationerna normalt ska ligga.

### Lösning 1 -- Ändra Default Project i Package Manager Console

I Visual Studio finns längst upp i **Package Manager Console**:

``` text
Default project:
```

Den står troligen på:

``` text
MovieApi.Core
```

Byt den till:

``` text
MovieApi.Data
```

och kör sedan:

``` powershell
Add-Migration Init
```

### Lösning 2 -- Ange projekt explicit med CLI

Om du använder `dotnet ef`:

``` bash
dotnet ef migrations add Init \
    --project MovieApi.Data \
    --startup-project MovieApi.API
```

Detta är ofta det enklaste när lösningen är uppdelad i flera projekt.

### Lösning 3 -- Kontrollera `UseSqlServer`

I `Program.cs` kan migrationsassembly anges explicit:

``` csharp
builder.Services.AddDbContext<MovieApiContext>(options =>
{
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        x => x.MigrationsAssembly("MovieApi.Data"));
});
```

Det behövs framför allt när startup-projektet och projektet som
innehåller migrationerna är olika.

------------------------------------------------------------------------

## Fråga: Varför är Core target project?

Det beror på **var Package Manager Console är inställd att köra
kommandot**, inte på Entity Framework i sig.

När du kör:

``` powershell
Add-Migration Init
```

använder Visual Studio två viktiga projekt:

1.  **Default project / Target project** -- projektet där migrationen
    ska skapas.
2.  **Startup project** -- projektet som startas för att läsa
    `Program.cs`, dependency injection och konfiguration.

Om felmeddelandet säger:

``` text
Your target project 'MovieApi.Core'
```

betyder det att **Default project i Package Manager Console är inställt
på `MovieApi.Core`**.

### Kontrollera detta i Visual Studio

Öppna:

**Tools → NuGet Package Manager → Package Manager Console**

Längst upp finns en rullista ungefär som:

``` text
Package source: ...
Default project: MovieApi.Core
```

Om den står på `MovieApi.Core` blir det just detta target project.

Om migrationerna ska ligga i Data-projektet, byt till:

``` text
Default project: MovieApi.Data
```

### Skillnaden mellan Startup Project och Target Project

  -----------------------------------------------------------------------
  Projekt                             Används till
  ----------------------------------- -----------------------------------
  **Startup Project**                 Kör `Program.cs` och bygger DI,
                                      konfiguration och
                                      anslutningssträngar. Ofta
                                      `MovieApi.API`.

  **Target / Default Project**        Här skapas migrationsfilerna. Ofta
                                      `MovieApi.Data`.
  -----------------------------------------------------------------------

Det är alltså helt normalt att ha:

``` text
Startup Project: MovieApi.API
Default Project: MovieApi.Data
```

I en Clean Architecture-liknande lösning är det normalt att `Core`
innehåller domänmodeller och interfaces medan `Data` innehåller EF Core,
`DbContext`, repositories och migrations.

------------------------------------------------------------------------

## Kort sammanfattning

För en lösning med exempelvis:

``` text
MovieApi.API
MovieApi.Core
MovieApi.Data
MovieApi.Services
```

är en vanlig konfiguration:

``` text
Startup project  = MovieApi.API
Target project   = MovieApi.Data
DbContext        = MovieApi.Data
Migrations       = MovieApi.Data
```

I Package Manager Console väljer du därför normalt:

``` text
Default project: MovieApi.Data
```

och kör:

``` powershell
Add-Migration Init
```

Alternativt med .NET CLI:

``` bash
dotnet ef migrations add Init --project MovieApi.Data --startup-project MovieApi.API
```
