const mongoose = require("mongoose");

const plansSchema = new mongoose.Schema({
    title: String,
    startDate: Number,
    endDate: Number,
    route:
        {
            id: {},
            departureCity: String,
            arrivalCity: String,
            departureDate: Date,
            arrivalDate: Date,
            travelMethod: String,
            travelCosts: Number,
            accomodationCosts: Number,
            otherCosts: Number,
            activities: []
        }
});

module.exports = mongoose.model("Plans", plansSchema);