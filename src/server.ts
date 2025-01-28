import express from "express";
import http from "http";
import config from "./config/config";
import routes from "./routes/index";
import middleware from "./middleware/cors";
import { Superhero } from "./model/superhero";


const app = express();
let superheroes: Superhero[] = [];
app.use(middleware("*"));
app.use(express.json());
app.use(routes);

export {superheroes}
const server = http.createServer(app);
server.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});