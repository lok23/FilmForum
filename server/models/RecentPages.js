const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecentPagesSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId : {
        type: String,
        unique: 1 // we don't want users seeing multiple of the save recently visited pages
    }

}, { timestamps: true })


const RecentPages = mongoose.model('RecentPages', RecentPagesSchema);

module.exports = { RecentPages }