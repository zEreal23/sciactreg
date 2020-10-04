const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Object } = mongoose.Schema;

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
        user: [{
            user_id: {
                type: String
            },
            u_id: {
                type: String
            }
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Act", actSchema);