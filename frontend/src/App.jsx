import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:3001";

export default function App() {
  const [cars, setCars] = useState([]);

  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [power, setPower] = useState("");
  const [modelYear, setModelYear] = useState("");
  const [image, setImage] = useState("");

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchCars = async () => {
    const res = await fetch(`${API}/cars`);
    const data = await res.json();
    setCars(data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // ➕ ADD CAR
  const addCar = async () => {
    if (!brand) return;

    const newCar = {
      id: Date.now(),
      brand,
      type,
      power,
      modelYear,
      image:
          image ||
          "https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg",
    };

    await fetch(`${API}/cars`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCar),
    });

    setBrand("");
    setType("");
    setPower("");
    setModelYear("");
    setImage("");

    fetchCars();
  };

  // 🗑 DELETE
  const deleteCar = async (id) => {
    await fetch(`${API}/cars/${id}`, { method: "DELETE" });
    fetchCars();
  };

  // ✏️ EDIT START
  const startEdit = (car) => {
    setEditId(car.id);
    setEditData(car);
  };

  // 💾 SAVE EDIT
  const saveEdit = async (id) => {
    await fetch(`${API}/cars/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });

    setEditId(null);
    setEditData({});
    fetchCars();
  };

  return (
      <div className="bg">
        <div className="container">
          <h1 className="title">🚗 Car Garage</h1>

          {/* ADD FORM */}
          <div className="form">
            <input placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
            <input placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
            <input placeholder="Power (kW)" value={power} onChange={(e) => setPower(e.target.value)} />
            <input placeholder="Model year" value={modelYear} onChange={(e) => setModelYear(e.target.value)} />
            <input placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />

            <button onClick={addCar}>Přidat auto</button>
          </div>

          {/* CARS */}
          <div className="grid">
            {cars.map((car) => (
                <div className="card" key={car.id}>
                  {editId === car.id ? (
                      <>
                        <input
                            value={editData.brand || ""}
                            onChange={(e) =>
                                setEditData({ ...editData, brand: e.target.value })
                            }
                        />
                        <input
                            value={editData.type || ""}
                            onChange={(e) =>
                                setEditData({ ...editData, type: e.target.value })
                            }
                        />
                        <input
                            value={editData.power || ""}
                            onChange={(e) =>
                                setEditData({ ...editData, power: e.target.value })
                            }
                        />
                        <input
                            value={editData.modelYear || ""}
                            onChange={(e) =>
                                setEditData({ ...editData, modelYear: e.target.value })
                            }
                        />
                        <input
                            value={editData.image || ""}
                            onChange={(e) =>
                                setEditData({ ...editData, image: e.target.value })
                            }
                        />

                        <button onClick={() => saveEdit(car.id)}>Uložit</button>
                      </>
                  ) : (
                      <>
                        <img src={car.image} alt={car.brand} />

                        <h2>{car.brand}</h2>
                        <p>🚘 {car.type}</p>
                        <p>⚡ {car.power}</p>
                        <p>📅 {car.modelYear}</p>

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