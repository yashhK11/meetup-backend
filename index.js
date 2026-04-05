const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: String },
  time: { type: String },
  type: { type: String, enum: ["Online", "Offline"] },
  image: { type: String },
  venue: { type: String },
  address: { type: String },
  price: { type: Number, default: 0 },
  tags: [{ type: String }],
  speakers: [{ name: String, role: String, image: String }],
  hostedBy: { type: String },
  dressCode: { type: String },
  ageRestriction: { type: String },
});

const Event = mongoose.model("Event", eventSchema);

app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    if (events.length != 0) {
      res.json(events);
    } else {
      res.status(404).json({ error: "No events found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events." });
  }
});

app.get("/events/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: "Event not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event." });
  }
});

app.post("/events", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json({ message: "Event added successfully.", savedEvent });
  } catch (error) {
    res.status(500).json({ error: "Failed to create event." });
  }
});

app.post("/events/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (updatedEvent) {
      res
        .status(200)
        .json({ message: "Event updated successfully.", updatedEvent });
    } else {
      res.status(404).json({ error: "Event not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update event." });
  }
});

app.delete("/events/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (deletedEvent) {
      res.status(200).json({ message: "Event deleted successfully." });
    } else {
      res.status(404).json({ error: "Event not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event." });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

module.exports = app;
