const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        hour: {
            type: Number,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        description: {
            type: String,
            trim: true,
            required: true,
            maxlength: 500
        },
        participants: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Act", actSchema);