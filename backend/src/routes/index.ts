import express, { Router } from "express";
import { SuperheroValidator } from "../model/superhero";
import { superheroes } from "../app";
import { broadcast } from "../server";
import { v4 as uuidv4 } from "uuid";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

router.post("/superheroes", (req, res) => {
  const { name, superpower, humilityScore } = req.body;

  const result = SuperheroValidator.validate({
    name,
    superpower,
    humilityScore,
  });

  if (result.error) {
    return res.status(400).json({
      error: "Invalid superhero data",
      details: result.error.details.map((detail) => detail.message),
    });
  }
  const newSuperhero = {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    ...result.value,
  };
  superheroes.push(newSuperhero);
  broadcast(JSON.stringify(newSuperhero));
  res.status(201).json({
    message: "Superhero added successfully!",
    superhero: newSuperhero,
  });
});

router.get("/superheroes", (req, res) => {
  const sortedSuperheroes = superheroes.sort(
    (a, b) => b.humilityScore - a.humilityScore
  );
  res.status(200).json(sortedSuperheroes);
});

export default router;
