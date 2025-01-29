import {useEffect, useState} from "react";
import "./App.css";
import Joi from "joi"; // Import Joi

interface Superhero {
    id: string;
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
    const [errorMessage, setErrorMessage] = useState<string>("");

    const updateSuperheroes = (prevHeroes: Superhero[], newHero: Superhero) => {
        const updatedHeroes = prevHeroes.some((hero) => hero.id === newHero.id)
            ? [...prevHeroes]
            : [...prevHeroes, newHero];

        return updatedHeroes.sort((a, b) => b.humilityScore - a.humilityScore);
    };

    useEffect(() => {
        console.log("Fetching existing superheroes");
        fetch("http://localhost:5000/superheroes")
            .then((response) => response.json())
            .then((data) => setSuperheroes(data))
            .catch((error) => console.error("Error fetching superheroes:", error));

        const ws = new WebSocket("ws://localhost:5000");

        ws.onmessage = (event) => {
            const newSuperhero: Superhero = JSON.parse(event.data);
            setSuperheroes((prevHeroes) =>
                updateSuperheroes(prevHeroes, newSuperhero)
            );
        };

        return () => {
            ws.close();
        };
    }, []);

    // Define validation schema using Joi
    const superheroSchema = Joi.object({
        name: Joi.string().required().label("Name"),
        superpower: Joi.string().required().label("Superpower"),
        humilityScore: Joi.number()
            .integer() // Ensures the number is an integer
            .min(1)
            .max(10)
            .precision(0) // Ensures no decimals (rounds down if present)
            .label("Humility Score"),
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;
        setNewHero({
            ...newHero,
            [name]: name === "humilityScore" ? parseInt(value) || 1 : value,
        });
        // Clear error message on input change
        if (errorMessage) {
            setErrorMessage("");
        }
    };

    const addSuperhero = async () => {
        try {
            // Validate newHero using Joi before sending the request
            const {error} = superheroSchema.validate(newHero);

            if (error) {
                // Set error message from Joi validation
                setErrorMessage(`Validation Error: ${error.details.map(d => d.message).join(", ")}`);
                return;
            }

            const response = await fetch("http://localhost:5000/superheroes", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newHero),
            });

            if (response.ok) {
                const addedSuperhero = await response.json();
                setSuperheroes((prevHeroes) =>
                    updateSuperheroes(prevHeroes, addedSuperhero.superhero)
                );
                setNewHero({name: "", superpower: "", humilityScore: 1});
            } else {
                const errorResponse = await response.json();
                if (errorResponse.error && errorResponse.details) {
                    const detailedError = errorResponse.details.join(", ");
                    setErrorMessage(`Error: ${detailedError}`);
                }
            }
        } catch (error) {
            console.error("Error adding superhero:", error);
            setErrorMessage("An unexpected error occurred.");
        }
    };

    return (
        <>
            <div className="form-container">
                <h2>Add a Superhero</h2>
                {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
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