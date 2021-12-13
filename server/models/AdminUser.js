const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminUserSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    commentsDeleted : {
        type: Number,
        default: 0
    }

}, { timestamps: true })

const AdminUser = mongoose.model('AdminUser', AdminUserSchema);

module.exports = { AdminUser }