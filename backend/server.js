// import knihoven
import express from "express"; // framework pro vytvoření serveru
import cors from "cors";       // umožní komunikaci mezi různými doménami (např. frontend ↔ backend)

// vytvoření serveru
const app = express();

// funkce, které se spouští před requesty
app.use(cors());          // povolí CORS
app.use(express.json());  // umožní číst JSON data z requestu (req.body)

// jednoduchá "databáze" v paměti (pole aut)
let cars = [
  {
    id: 1,
    brand: "Škoda Octavia 2 RS",
    image: "https://carlook.net/data/db_photos/skoda/octavia_rs/2nd_f/skoda_octavia_rs_2nd_f_touring5d-976.jpg"
  },
  {
    id: 2,
    brand: "BMW M3",
    image: "https://cdn.motor1.com/images/mgl/JO3pmX/s1/2024-bmw-m3-cs.jpg"
  },
  {
    id: 3,
    brand: "Audi R8",
    image: "https://doubleapex.co.za/wp-content/uploads/2022/10/Audi-R8-Coupe-V10-GT-RWD.jpeg"
  }
];

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