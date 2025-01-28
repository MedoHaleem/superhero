import http from "http";
import config from "./config/config";
import { app } from "./app";


const server = http.createServer(app);
server.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});