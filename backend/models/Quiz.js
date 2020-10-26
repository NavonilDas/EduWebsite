const mongoose = require('mongoose');

const QuizSchema = mongoose.Schema({
    chapter_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
    title:String,
    index:Number
});

module.exports = mongoose.model('Quiz', QuizSchema);