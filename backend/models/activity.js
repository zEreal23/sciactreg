const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema

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
            type: ObjectId,
            ref: "Category",
            required: true
        },
        enrolluser: [{ 
            type: ObjectId, 
            ref: "User" 
        }],
        description: {
            type: String,
            trim: true,
            required: true,
            maxlength: 500
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Act", actSchema);