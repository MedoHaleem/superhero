import routes from "./routes/index";
import middleware from "./middleware/cors";
import { Superhero } from "./model/superhero";
import express from "express";
import helmet from "helmet";

const app = express();
let superheroes: Superhero[] = [];
app.use(middleware("http://localhost:5173"));
app.use(express.json());
app.use(helmet());
app.use(routes);

export {superheroes, app}