const mongoose = require('mongoose');
// const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'Name cannot be empty'
    },
    email: {
        type: String,
        required: 'Email cannot be empty'
    },
    password: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    plans: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Plans"
        }
        
    ]
});

// userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);
module.exports = User;