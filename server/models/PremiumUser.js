const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PremiumUserSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    trailersClicked : {
        type: Number,
        default: 0
    }

}, { timestamps: true })

const PremiumUser = mongoose.model('PremiumUser', PremiumUserSchema);

module.exports = { PremiumUser }