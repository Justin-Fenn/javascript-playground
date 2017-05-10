const Express = require('express');
const http = require('http');
const socket = require("socket.io");
const uuid = require("node-uuid");

const rooms = new Map();

const app = new Express();
const server = http.createServer(app);
const io = socket(server);

// HTTP API
app.use((req,res,next) => {
    // Enable CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET,OPTIONS,HEAD,PUT,POST,DELETE");
    next();
})

app.get("/test", (req,res) => {
    res.json({
        test: "test"
    });
});

app.get("/api/rooms/:room", (req,res) => {
    const count = parseInt(req.query.count) || 10;
    const room = req.params.room.toLowerCase();
    if (!rooms.has(room)) {
        res.sendStatus(404);
        return;
    }
    const { messages, users, createdAt } = rooms.get(room);
    res.json({
        room,
        users,
        createdAt,
        messages: messages.slice(Math.max(messages.length - count, 1))
    });
});

app.put("/api/rooms/:room", (req,res) =>{
    const room = req.params.room.toLowerCase();
    if (!rooms.has(room)) {
        addRoom(room);
        res.sendStatus(201);
        return;
    }
    res.sendStatus(200);
});

const Messages = {
    CONNECTION: "connection",
    SEND: "send",
    DISCONNECT: "disconnect",
    NEW: "new",
    USER_JOINED: "user_joined",
    USER_DISCONNECTED: "user_disconnected",
};

// WebSocket setup

function addRoom(room) {
    const roomState = { createdAt: Date.now(), users: [], messages: [] };
    rooms.set(room, roomState);
    console.info(`Adding room ${room}`);
    const conn = io.of(`/rooms/${room}`);
    
    conn.on(Messages.CONNECTION, socket => {
        const userId = uuid.v4();
        console.info(`Room ${room}: user ${userId} joined`);

        const user = { id: userId, connected: true };
        roomState.users.push(user);
        conn.emit(Messages.USER_JOINED, user);

        socket.on(Messages.SEND, message => {
            if (typeof(message) !== "string") {
                console.info(`Room ${room}: invalid message from user ${userId}`);    
                return;
            }
            console.info(`Room ${room}: new message ${message} from user ${userId}`);
            const msg = {
                from: userId,
                when: Date.now(),
                message
            };
            roomState.messages.push(msg);
            conn.emit(Messages.NEW, msg);
        });

        socket.on(Messages.DISCONNECT, () => {
            console.info(`Room ${room}: user ${userId} disconnected`);
            user.connected = false;
            conn.emit(Messages.USER_DISCONNECTED, user);
        });
    });
}

const PORT = parseInt(process.env.PORT) || 8082;

server.listen(PORT, () => console.info(`Server is active on port ${PORT}`));