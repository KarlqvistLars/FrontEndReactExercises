import { useState, type SubmitEvent } from "react";
import carImage from "../public/favicon.svg";

type Car = {
  id: number;
  registrationNumber: string;
  brand: string;
};

function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [error, setError] = useState<string | null>(null);


  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedRegistration = registrationNumber
      .trim()
      .toUpperCase()
      .replaceAll(" ", "");

    const registrationRegex = /^[A-Z]{3}\d{2}[A-Z0-9]$/;

    if (!registrationRegex.test(normalizedRegistration)) {

      setError("Ange ett giltigt regnummer, exempelvis ABC123 eller ABC12D.");
      return;
    }

    if (!brand.trim()) {
      setError("Ange ett bilmärke.");
      return;
    }

    if (cars.some((car) => car.registrationNumber === normalizedRegistration)) {
      setError("Det finns redan en bil med det regnumret i garaget.");
      return;
    }

    const newCar: Car = {
      id: Date.now(),
      registrationNumber: normalizedRegistration,
      brand: brand.trim(),
    };

    // Lägg till bilen i state-arrayen immutabelt med spreadoperatorn.
    setCars((prev) => [...prev, newCar]);

    // Nollställ formuläret.
    setRegistrationNumber("");
    setBrand("");
    setError(null);
  }

  function removeCar(id: number) {
    // Använd filter() för att ta bort fordonet från listan.
    setCars((prev) => prev.filter((car) => car.id !== id));
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8 text-center">
          <div className="flex w-full flex-row items-center justify-center gap-4">
            <img
              src={carImage}
              alt="Car"
              className="h-20 w-20 object-contain" />
            <h1 className="text-3xl font-bold text-slate-900">
              MiniGarage
            </h1>
          </div>
          <p className="mt-3 text-lg text-slate-600">
            {cars.length === 0
              ? "Garaget är helt tomt"
              : `Antal bilar i garaget: ${cars.length}`}
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="mb-8 space-y-4 rounded-xl bg-white p-6 shadow"
        >
          {error && (
            <p className="rounded-lg bg-red-100 px-4 py-2 text-red-700">
              {error}
            </p>
          )}
          <div>
            <label
              htmlFor="registrationNumber"
              className="mb-1 block font-medium text-slate-700"
            >
              Regnummer
            </label>

            <input
              id="registrationNumber"
              type="text"
              value={registrationNumber}
              onChange={(event) =>
                setRegistrationNumber(event.target.value)
              }
              placeholder="ABC123"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label
              htmlFor="brand"
              className="mb-1 block font-medium text-slate-700"
            >
              Märke
            </label>

            <input
              id="brand"
              type="text"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              placeholder="Volvo"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Parkera bil
          </button>
        </form>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            Parkerade bilar
          </h2>

          <div className="space-y-3">
            {cars.map((car) => (
              <article
                key={car.id}
                className="flex items-center justify-between rounded-xl bg-white p-4 shadow"
              >
                <div>
                  <h3 className="font-bold text-slate-900">
                    {car.registrationNumber}
                  </h3>

                  <p className="text-slate-600">{car.brand}</p>
                </div>

                <button
                  type="button"
                  onClick={() => removeCar(car.id)}
                  className="rounded-lg bg-red-100 px-4 py-2 font-medium text-red-700 transition hover:bg-red-200"
                >
                  Ta bort
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;