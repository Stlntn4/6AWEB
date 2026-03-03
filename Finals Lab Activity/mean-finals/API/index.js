const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const CONNECTION_STRING = "mongodb://localhost:27017/";
const DATABASE_NAME = "MyDb";

let database = null;

// Start server and connect to MongoDB
async function start() {
  try {
    const client = new MongoClient(CONNECTION_STRING, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    await client.connect();
    database = client.db(DATABASE_NAME);
    console.log("Connected to MongoDB");

    app.listen(5038, () => {
      console.log("Server running on http://localhost:5038");
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

start();

// ================== ROUTES ==================

// GET ALL BOOKS
app.get("/api/books/GetBooks", async (req, res) => {
  try {
    if (!database) return res.status(500).json({ error: "Database not connected" });
    const books = await database.collection("Books").find({}).toArray();
    res.json({ success: true, data: books });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ success: false, error: "Failed to fetch books" });
  }
});

// ADD BOOK
app.post("/api/books/AddBook", async (req, res) => {
  try {
    if (!database) return res.status(500).json({ error: "Database not connected" });

    const { title, desc, price, author, category } = req.body;
    if (!title || !desc || !price || !author || !category) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const newBook = {
      title,
      desc,
      price: Number(price),
      author,
      category,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await database.collection("Books").insertOne(newBook);
    res.json({ success: true, message: "Added Successfully", bookId: result.insertedId });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ success: false, error: "Failed to add book" });
  }
});

// UPDATE BOOK
app.put("/api/books/UpdateBook/:id", async (req, res) => {
  try {
    if (!database) return res.status(500).json({ error: "Database not connected" });

    const id = req.params.id;
    const { title, desc, price, author, category } = req.body;

    if (!title || !desc || !price || !author || !category) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const result = await database.collection("Books").updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, desc, price: Number(price), author, category, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) return res.status(404).json({ success: false, error: "Book not found" });
    res.json({ success: true, message: "Updated Successfully" });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ success: false, error: "Failed to update book" });
  }
});

// DELETE BOOK
app.delete("/api/books/DeleteBook/:id", async (req, res) => {
  try {
    if (!database) return res.status(500).json({ error: "Database not connected" });

    const id = req.params.id;
    const result = await database.collection("Books").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) return res.status(404).json({ success: false, error: "Book not found" });
    res.json({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ success: false, error: "Failed to delete book" });
  }
});