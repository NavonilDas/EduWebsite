const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name: String,
    description: String,
    slug: String,
    thumbnail: String,
    postedOn: Date,
    updateOn: Date,
    by: String,
    duration: Number,
    isPaid: Boolean,
    price: Number,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Course', CourseSchema);