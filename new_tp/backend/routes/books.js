import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

// Add book
router.post("/", async (req, res) => {
    const newBook = new Book(req.body);
    const saved = await newBook.save();
    res.json(saved);
});

// Get all books
router.get("/", async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

// Delete a book
router.delete("/:id", async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

export default router;
