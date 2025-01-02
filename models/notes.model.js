
const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    userId: String,
    notes: Array,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Notes", notesSchema);