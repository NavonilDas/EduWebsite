const mongoose = require('mongoose');

const MediaSchema = mongoose.Schema({
    title:String,
    location:String,
    index:Number,
    chapter_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
});

module.exports = mongoose.model('Media', MediaSchema);