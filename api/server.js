import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
dotenv.config();

const connectDB = async () => {
try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB!");
} catch (error) {
    console.log(error);
}
};

// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Allows frontend to request backend, credentials enable sharing of cookies
app.use(express.json()); // Allows client to send JSON data to the server
app.use(cookieParser()); // Cookies for better authentication

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";

    return res.status(errorStatus).send(errorMessage);
});

app.listen(3000, () => {
    connectDB();
    console.log('Server is running on http://localhost:3000');
});