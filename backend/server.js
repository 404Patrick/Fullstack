// import knihoven
import express from "express"; // framework pro vytvoření serveru
import cors from "cors";       // umožní komunikaci mezi různými doménami (např. frontend ↔ backend)

// vytvoření serveru
const app = express();

// funkce, které se spouští před requesty
app.use(cors());          // povolí CORS
app.use(express.json());  // umožní číst JSON data z requestu (req.body)

// jednoduchá "databáze" v paměti (pole aut)
let cars = [];

// GET /cars → vrátí všechna auta
app.get("/cars", (req, res) => {
  res.json(cars); // pošle pole aut jako JSON
});

// POST /cars → přidá nové auto
app.post("/cars", (req, res) => {
  const car = req.body; // vezme data z requestu (např. { id: 1, brand: "Škoda" })
  cars.push(car);       // přidá auto do pole
  res.json(car);        // vrátí přidané auto
});


// DELETE /cars/:id → smaže auto podle ID
app.delete("/cars/:id", (req, res) => {
  const id = Number(req.params.id); // získá ID z URL a převede na číslo

  // vytvoří nové pole bez auta s daným ID
  cars = cars.filter(c => c.id !== id);

  res.json({ success: true }); // vrátí informaci o úspěchu
});

// GET /cars/:id vrátí jedno auto podle ID
app.get("/cars/:id", (req, res) => {
  const id = Number(req.params.id); // získá ID z URL

  // najde auto s daným ID
  const car = cars.find(c => c.id === id);

  res.json(car); // vrátí nalezené auto (nebo undefined pokud neexistuje)
});

// PUT /cars/:id upraví auto podle ID
app.put("/cars/:id", (req, res) => {
  const id = Number(req.params.id); // získá ID z URL

  // projde všechna auta
  cars = cars.map(c =>
      c.id === id
          ? { ...c, ...req.body } // pokud ID sedí → aktualizuje data
          : c                     // jinak nechá beze změny
  );

  res.json({ success: true }); // vrátí informaci o úspěchu
});

// spuštění serveru
app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});