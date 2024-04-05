const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Gallery = mongoose.model(
    "Gallery",
    new Schema ({
        images: {
            type: Array,
        },
        image: {
            type: String,
        }
    }, {
        timestamps: true
    })
);

module.exports = Gallery;
