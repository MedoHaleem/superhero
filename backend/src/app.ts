import routes from "./routes/index";
import middleware from "./middleware/cors";
import { Superhero } from "./model/superhero";
import express from "express";

const app = express();
let superheroes: Superhero[] = [];
app.use(middleware("http://localhost:5173"));
app.use(express.json());
app.use(routes);

export {superheroes, app}