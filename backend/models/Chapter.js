const mongoose = require('mongoose');

const ChapterSchema = mongoose.Schema({
    name: String,
    description: String,
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    index: Number
});

module.exports = mongoose.model('Chapters', ChapterSchema);