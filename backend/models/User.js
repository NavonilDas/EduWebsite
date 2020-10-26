const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    phoneNo: String,
    blocked: Boolean,
    type: { type: String, enum: ['admin', 'student', 'teacher'], default: 'student' },
    profile: String,
    password: String
});

UserSchema.methods.setPassword = pass => {
    
};

module.exports = mongoose.Model('User', UserSchema);