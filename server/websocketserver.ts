import { Server } from "http";
import { Server as WSServer, WebSocket, RawData } from "ws";
import { DebouncedFunction, Message, User } from "./interfaces";
import { debounce } from "lodash";

let websocketServer: WSServer;
const activeUsers: User[] = [];
const typingUsers: User[] = [];
const typingUsersDebounced: { [key: string]: DebouncedFunction } = {};

// Broadcast a message to all connected clients
const broadcastMessage = (message: Message) => {
  websocketServer.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
};

// Initialize the WebSocket server
const initializeWebsocketServer = (server: Server) => {
  websocketServer = new WSServer({ server });
  websocketServer.on("connection", onConnection);
};

// Handle a new WebSocket connection
const onConnection = (ws: WebSocket) => {
  ws.on("message", (message) => onMessage(ws, message));
  ws.on("close", () => onClose(ws));
};

// Handle WebSocket disconnection
const onClose = (ws: WebSocket) => {
  const userIndex = activeUsers.findIndex((user) => user.ws === ws);
  if (userIndex !== -1) {
    const removedUser = activeUsers.splice(userIndex, 1);
    removeTypingStatus(removedUser[0].id);
    broadcastMessage({ type: "activeUsers", users: activeUsers });
  }
};

// Remove a user from the typingUsers array and notify others
const removeTypingStatus = (userId: string) => {
  const index = typingUsers.findIndex((u) => u.id === userId);
  if (index !== -1) {
    typingUsers.splice(index, 1);
    broadcastMessage({ type: "typing", users: typingUsers });
  }
};

// Handle incoming WebSocket messages
const onMessage = (ws: WebSocket, message: RawData) => {
  const msg = JSON.parse(message.toString()) as Message;

  // Ensure the message contains a valid user
  if (!msg.user || !msg.user.id) return;

  switch (msg.type) {
    case "newUser":
      if (activeUsers.some((user) => user.id === msg.user!.id)) return;
      activeUsers.push({ ...msg.user, ws });
      broadcastMessage({ type: "activeUsers", users: activeUsers.map(({ id, name }) => ({ id, name })) });
      break;

    case "message":
      if (!msg.message) return;
      removeTypingStatus(msg.user!.id);
      broadcastMessage({ type: "message", user: msg.user, message: msg.message });
      break;

    case "typing":
      if (!typingUsers.some((u) => u.id === msg.user!.id)) {
        typingUsers.push(msg.user!);
        broadcastMessage({ type: "typing", users: typingUsers });
      }

      if (typingUsersDebounced[msg.user!.id]) typingUsersDebounced[msg.user!.id].cancel();

      typingUsersDebounced[msg.user!.id] = debounce(() => removeTypingStatus(msg.user!.id), 2000);
      typingUsersDebounced[msg.user!.id]();
      break;
  }
};

export { initializeWebsocketServer };
