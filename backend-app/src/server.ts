import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
// import chats from './data/chat.js';
import { connectDB } from "./config/db.js";
import colors, { bgYellow, yellow } from "colors";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { Server } from "socket.io";
import path from "path";
import { IUser } from "./models/UserModel.js";



const port = process.env.PORT || 3000;

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("API is running successfully!");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// ----------------Deployment--------------------

    const __dirname1 = path.resolve();
    if(process.env.NODE_ENV === 'production'){
        app.use(express.static(path.resolve(__dirname1,'../../frontend-app/dist')))

        app.get('*', (req,res) => {
            res.sendFile(path.resolve(__dirname1, "../../frontend-app/dist", "index.html"))
        })
    }else{
        app.get("/", (req: Request, res: Response) => {
            res.send("API is Running Successfully");
        })
    }

// ----------------Deployment--------------------

app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(
    colors.cyan(" Server running on localhost: ") +
      colors.yellow(`${port}`).bold
  );
});

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3500"
    }
});

io.on("connection", (socket) => {
    console.log('Connected to socket.io')

    socket.on("setup",(userData) => {
        socket.join(userData._id)
        console.log(userData._id)
        socket.emit("connected")
    });

    socket.on("join-chat", (room) => {
        socket.join(room);
        // console.log("User joined room: " + room);
    });

    socket.on('typing', (room) => socket.in(room).emit('typing'));
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

    socket.on("new message", (newMessageReceived) => {
        let chat = newMessageReceived.chat;

        if(!chat.users) return console.log('chat.users not defined');

        chat.users.forEach((user:IUser) => {
            if(user._id == newMessageReceived.sender._id) return;

            socket.in(user._id as string).emit("message received", newMessageReceived)
        })
    });

    socket.off("setup", (userData) => {
        console.log('User Disconnected');
        socket.leave(userData._id)
    })
})