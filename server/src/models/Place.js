const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    address: { type: String, required: true },
    photos: { type: [String], default: [] },
    description: { type: String },
    perks: { type: [String], default: [] },
    extraInfo: { type: String },
    checkIn: { type: Date },
    checkOut: { type: Date },
    maxGuests: { type: Number, min: 1 },
    price: { type: Number, required: true, min: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Place', PlaceSchema);
