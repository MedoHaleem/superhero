import express, { Router } from "express";
import { SuperheroValidator } from "../model/superhero";
import { superheroes } from "../server";

const router = Router();

router.get("/", (req, res) => {
    res.status(200).send("Hello World");
});


router.post("/superheroes", (req, res) => {
  const { name, superpower, humilityScore } = req.body;
 
   const result = SuperheroValidator.validate({ name, superpower, humilityScore });
 
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
  
  router.get("/superheroes", (req, res) => {
    res.status(200).json(superheroes);
  });

export default router;