import { createServer } from "http";
import express, { Express } from "express";
import cors from "cors";
import Joi from "joi";

const port = 5000;
const expressApp: Express = express();

interface Superhero {
  name: string;
  superpower: string;
  humilityScore: number;
}

const superheroSchema = Joi.object({
  name: Joi.string().required().label("Name"),
  superpower: Joi.string().required().label("Superpower"),
  humilityScore: Joi.number()
    .min(1)
    .max(10)
    .precision(0) // if user sent 1.2 it gonna be 1
    .label("Humility Score"),
});

const validateSuperhero = (superhero: Superhero) =>
  superheroSchema.validate(superhero);

// init Memory Storage
let superheroes: Superhero[] = [];

expressApp.use(
  cors({
    origin: "*",
  })
);

expressApp.use(express.json());

expressApp.post("/superheroes", (req, res) => {
  const { name, superpower, humilityScore } = req.body;

  const result = validateSuperhero({ name, superpower, humilityScore });

  if (result.error) {
    return res.status(400).json({
      error: "Invalid superhero data",
      details: result.error.details.map((detail) => detail.message),
    });
  }

  superheroes.push(result.value);
  res.status(201).json({
    message: "Superhero added successfully!",
    superhero: result.value,
  });
});

expressApp.get("/superheroes", (req, res) => {
  res.status(200).json(superheroes);
});

const server = createServer(expressApp);
server.listen(port, () => {
  console.log(`HTTP Server listening on port ${port}`);
});
