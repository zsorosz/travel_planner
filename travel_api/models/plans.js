const mongoose = require("mongoose");

const plansSchema = new mongoose.Schema({
    title: String,
    startDate: Number,
    endDate: Number,
    route: [
        {
            id: {},
            departureCity: String,
            arrivalCity: String,
            departureDate: Date,
            arrivalDate: Date,
            travelMethod: String
        }
    ]
//     route: [ 
//         {
//             memberId: {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: "Member"
//             },
//             memberName: String,
//             plans: [
//                 {
//                     id: {},
//                     year: Number,
//                     month: Number,
//                     totalHours: Number,
//                     weekendHours: Number,
//                     shifts: [
//                         {
//                             date: {},
//                             weekDay: String,
//                             shift: Number,
//                             hours: Number
//                         }
//                     ]
//                 }
//             ]
//         }    
//     ]
});

module.exports = mongoose.model("Plans", plansSchema);