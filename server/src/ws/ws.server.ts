import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { WebSocket, WebSocketServer } from "ws";
import { createServer, IncomingMessage } from "http";
import { app } from "../app.js";
import { config } from "../utils/validateEnvVariables.utils.js";

// wss initialization
const server = createServer(app);
const wss: WebSocketServer = new WebSocketServer({ server });

const PORT: number = Number(config.WEB_SOCKET_SERVER.WSS_PORT);

interface AuthenticationWebSocket extends WebSocket {
    user?: JwtPayload | string;
}

// jwt handshake
wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
    const authHeader: string = req.headers.authorization as string;
    const authWs = ws as AuthenticationWebSocket;

    if (!authHeader) {
        ws.close(1008, "Authorization header is missing");
        return;
    } else if (!authHeader.startsWith("Bearer ")) {
        ws.close(1008, "Authorization header is invalid");
        return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        ws.close(1008, "Token missing");
        return;
    }

    try {
        const decoded: JwtPayload | string = jwt.verify(
            token,
            config.jwt.SECRET
        );
        authWs.user = decoded;
        console.log("User connected:", authWs.user);
    } catch (err) {
        ws.close(1008, "Invalid token");
        return;
    }
});

// listen callback
server.listen(PORT, () => {
    console.log(`WSS is running at PORT: ${PORT}`);
});

// wss error handler
wss.on("error", (err) => {
    console.log(`WSS error: ${err}`);
});
