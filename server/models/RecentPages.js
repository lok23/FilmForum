const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecentPagesSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    movieId : {
        type: String,
    }

}, { timestamps: true })

// This ensures that there are no one user sees has the same movieId twice.
// https://stackoverflow.com/questions/16061744/mongoose-how-to-define-a-combination-of-fields-to-be-unique
// Note to self, in order to make changes to the schema, you need to drop the table first before changes will take effect.
RecentPagesSchema.index({ userFrom: 1, movieId: 1}, { unique: true });

const RecentPages = mongoose.model('RecentPages', RecentPagesSchema);

module.exports = { RecentPages }