import express from "express";
import { WebSocketServer, WebSocket } from "ws";

const app = express();
const httpserver = app.listen(3000);
const wss = new WebSocketServer({ server: httpserver });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
  ws.send("ServerMessage : - Hello! Hello You are Connected");
});
