const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Schedule = mongoose.model(
    "Scheduling",
    new Schema({
            clientId: {
                type: String,
                required: true
            },
            clientName: {
                type: String,
                required: true
            },
            clientPhone: {
                type: String,
                required: true
            },
            dataDay: {
                type: String,
                required: true
            },
            dataHour: {
                type: String,
                required: true
            },
            servicesRequested: []

        },
        {
            timestamps: true
        })
);

module.exports = Schedule;
