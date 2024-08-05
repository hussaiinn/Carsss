const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3100;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Define a schema and model for your data
const dataSchema = new mongoose.Schema({
  car_name: String,
  manufacturing_year: String,
  price: Number,
});

const Data = mongoose.model("Data", dataSchema, "cars");

// Define routes
app.get("/api/data", async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/data", async (req, res) => {
  const { car_name, manufacturing_year, price } = req.body;
  const newData = new Data({ car_name, manufacturing_year, price });

  try {
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/api/data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await Data.findByIdAndDelete(id);

    if (!deletedData) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json({ message: "Record deleted successfully", deletedData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findData = await Data.findById(id);
    res.json(findData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/data/:id", async (req, res) => {
  const { id } = req.params;
  const { car_name, manufacturing_year, price } = req.body;

  try {
    const updatedData = await Data.findByIdAndUpdate(
      id,
      { car_name, manufacturing_year, price },
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json({ message: "Record updated successfully", updatedData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
