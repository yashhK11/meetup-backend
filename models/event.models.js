const mongoose = require("mongoose");

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
module.exports = Event;
