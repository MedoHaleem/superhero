import http from "http";
import config from "./config/config";
import { app } from "./app";
import WebSocket, { Server as WebSocketServer } from 'ws';


const server = http.createServer(app);

type Client = WebSocket;

let clients: Client[] = [];

const wsServer = new WebSocketServer({ server });

const broadcast = (message: string) => {
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) { // Corrected here
            client.send(message);
        }
    });
}

export {broadcast}

wsServer.on('connection', (socket: Client) => {
    console.log('Client connected');
    clients.push(socket);

    socket.on('close', () => {
        console.log('Client disconnected');
        clients = clients.filter(client => client !== socket);
    });
});

server.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});