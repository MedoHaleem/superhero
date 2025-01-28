import { createServer } from "http";
import express, { Express } from "express";
import cors from "cors";

const port = 5000;
const expressApp: Express = express();

interface Superhero {
    name: string;
    superpower: string;
    humilityScore: number;
}

// init Memory Storage
let superheroes: Superhero[] = [];

expressApp.use(cors({
    origin: "*"
}));

expressApp.use(express.json());


expressApp.post("/superheroes", (req, res) => {
    const { name, superpower, humilityScore } = req.body;
    superheroes.push({
        name,
        superpower,
        humilityScore
    });
    res.status(201).json({ 
        message: "Superhero added successfully!", 
        superhero: { name, superpower, humilityScore }
    });
});

expressApp.get("/superheroes", (req, res) => {
    res.status(200).json(superheroes);
});

const server = createServer(expressApp);
server.listen(port, () => {
    console.log(`HTTP Server listening on port ${port}`);
});