import { createServer } from "http";
import express, { Express } from "express";
import cors from "cors";

const port = 5000;
const expressApp: Express = express();

expressApp.use(cors({
    origin: "*"
}));

expressApp.use(express.json());

expressApp.get("/", (req, res) => {
    res.status(200).send("Hello World");
});

const server = createServer(expressApp);
server.listen(port, () => {
    console.log(`HTTP Server listening on port ${port}`);
});