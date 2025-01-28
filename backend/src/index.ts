import express, { Express } from "express";
import http from "http";
import config from "./config/config";
import routes from "./routes/index";

const app: Express = express();
app.use(express.json());
app.use(routes);

const server = http.createServer(app);
server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});

export { app, server };