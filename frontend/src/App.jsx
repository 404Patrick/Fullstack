import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:3001";

export default function App() {
  const [cars, setCars] = useState([]);
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");

  const [editId, setEditId] = useState(null);
  const [editBrand, setEditBrand] = useState("");
  const [editImage, setEditImage] = useState("");

  const fetchCars = async () => {
    const res = await fetch(`${API}/cars`);
    const data = await res.json();
    setCars(data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const addCar = async () => {
    if (!brand) return;

    const newCar = {
      id: Date.now(),
      brand,
      image:
          image ||
          "https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg"
    };

    await fetch(`${API}/cars`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCar),
    });

    setBrand("");
    setImage("");
    fetchCars();
  };

  const deleteCar = async (id) => {
    await fetch(`${API}/cars/${id}`, {
      method: "DELETE",
    });

    fetchCars();
  };

  const startEdit = (car) => {
    setEditId(car.id);
    setEditBrand(car.brand);
    setEditImage(car.image);
  };

  const saveEdit = async (id) => {
    await fetch(`${API}/cars/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        brand: editBrand,
        image: editImage,
      }),
    });

    setEditId(null);
    fetchCars();
  };

  return (
      <div className="bg">
        <div className="container">
          <h1 className="title">🚗 Car Garage</h1>

          {/* ADD */}
          <div className="form">
            <input
                placeholder="Název auta"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
            />
            <input
                placeholder="URL obrázku (volitelné)"
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />
            <button onClick={addCar}>Přidat auto</button>
          </div>

          {/* CARS */}
          <div className="grid">
            {cars.map((car) => (
                <div className="card" key={car.id}>
                  {editId === car.id ? (
                      <>
                        <input
                            value={editBrand}
                            onChange={(e) => setEditBrand(e.target.value)}
                        />
                        <input
                            value={editImage}
                            onChange={(e) => setEditImage(e.target.value)}
                        />
                        <button onClick={() => saveEdit(car.id)}>Uložit</button>
                      </>
                  ) : (
                      <>
                        <img src={car.image} alt={car.brand} />
                        <h2>{car.brand}</h2>

                        <div className="actions">
                          <button onClick={() => startEdit(car)}>✏️ Edit</button>
                          <button onClick={() => deleteCar(car.id)}>🗑 Delete</button>
                        </div>
                      </>
                  )}
                </div>
            ))}
          </div>
        </div>
      </div>
  );
}