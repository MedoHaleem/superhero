import { useEffect, useState } from "react";
import "./App.css";
interface Superhero {
  name: string;
  superpower: string;
  humilityScore: number;
}

function App() {
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
  const [newHero, setNewHero] = useState({
    name: "",
    superpower: "",
    humilityScore: 1,
  });

  useEffect(() => {
    console.log("Fetching existing superheroes");
    fetch("http://localhost:5000/superheroes")
      .then((response) => response.json())
      .then((data) => setSuperheroes(data))
      .catch((error) => console.error("Error fetching superheroes:", error));
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewHero({
      ...newHero,
      [name]: name === "humilityScore" ? parseInt(value) || 1 : value,
    });
  };

  const addSuperhero = async () => {
    try {
      const response = await fetch("http://localhost:5000/superheroes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHero),
      });

      if (response.ok) {
        const addedSuperhero = await response.json();
        setSuperheroes((prevHeroes) =>
          [...prevHeroes, addedSuperhero.superhero].sort()
        );
        setNewHero({ name: "", superpower: "", humilityScore: 1 });
      } else {
        console.error("Failed to add superhero");
      }
    } catch (error) {
      console.error("Error adding superhero:", error);
    }
  };

  return (
    <>
      <div className="form-container">
        <h2>Add a Superhero</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newHero.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="superpower"
          placeholder="Superpower"
          value={newHero.superpower}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="humilityScore"
          placeholder="Humility Score"
          value={newHero.humilityScore}
          onChange={handleInputChange}
        />
        <button onClick={addSuperhero}>Add Superhero</button>
      </div>

      <div className="list-container">
        <h2>Superheroes List</h2>
        {superheroes.map((hero, index) => (
          <div key={index}>
            {`${hero.name} - ${hero.superpower} (Humility: ${hero.humilityScore})`}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
