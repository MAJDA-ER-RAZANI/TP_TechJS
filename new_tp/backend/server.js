import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bookRoutes from "./routes/books.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/booktracker")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.use("/api/books", bookRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
