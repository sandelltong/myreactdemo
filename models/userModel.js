const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'basic',
        enum: ["basic", "admin"]
    },
    accessToken: {
        type: String
    }
});
  
module.exports = mongoose.model('User', UserSchema);;