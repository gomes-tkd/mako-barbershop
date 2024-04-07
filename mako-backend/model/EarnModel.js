const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Earn = mongoose.model(
    "Earn",
    new Schema({
      serviceType: {
          type: String,
          required: true
      },
      serviceValue: {
          type: Number,
          required: true
      }
    })
);

module.exports = Earn;

