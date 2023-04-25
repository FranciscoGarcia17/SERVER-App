const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema(
    {
        content: {type: Array},
    }, {timestamps: true}
);

module.exports = mongoose.model("Like", LikeSchema);